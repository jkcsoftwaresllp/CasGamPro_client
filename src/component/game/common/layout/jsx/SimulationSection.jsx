import React, { useEffect, useRef, useState } from 'react';
import styles from '../style/SimulationSection.module.css';
import { useGameState } from '../helper/GameStateContext';
import { DeviceCapabilities } from '../helper/devices.js';
import { FrameProcessor } from '../helper/frames.js';
import { CountdownTimer } from './Timer';

export const SimulationSection = ({ gameType }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const wsRef = useRef(null);
  const gameState = useGameState();
  const { roundId } = gameState;

  // Timer state management
  const [timerState, setTimerState] = useState({
    phase: 'betting',
    duration: 20,
    isActive: false
  });

  const [streamType, setStreamType] = useState(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dealtCount, setDealtCount] = useState(0);

  const deviceConfig = useRef(DeviceCapabilities.getDeviceConfig());
  const frameProcessorRef = useRef(null);
  const currentFrameNumberRef = useRef(0);
  const hiddenTimeRef = useRef(0);

  const [stats, setStats] = useState({
    displayFps: 0,
    frameLag: 0,
    serverFps: 0,
  });

  const frameCountRef = useRef(0);
  const frameTimeRef = useRef(Date.now());
  const serverFrameCountRef = useRef(0);
  const serverLastTimeRef = useRef(Date.now());

  const isDevelopment = process.env.NODE_ENV === 'development';
  const productionIP = '88.222.214.174';
  const baseURL = isDevelopment ? 'ws://localhost:5500' : `ws://${productionIP}:5500`;
  const refreshThreshold = 3000;

  // Timer update routine.
  const updateTimerState = (phase, durationInMs) => {
    const durationInSeconds = Math.floor(durationInMs / 1000);
    console.log(`Updating timer: phase=${phase}, duration=${durationInSeconds}s`);
    setTimerState({
      phase,
      duration: durationInSeconds,
      isActive: true
    });
  };

  const handleWebSocketMessage = async (event) => {
    try {
      if (event.data instanceof Blob) {
        if (streamType !== 'non-dealing') {
          serverFrameCountRef.current++;
          const frameData = await frameProcessorRef.current?.processFrame(
            event.data,
            currentFrameNumberRef.current
          );
          if (frameData) {
            frameProcessorRef.current?.addFrame(frameData);
          }
          const now = Date.now();
          if (now - serverLastTimeRef.current >= 1000) {
            setStats(prev => ({
              ...prev,
              serverFps: serverFrameCountRef.current
            }));
            serverFrameCountRef.current = 0;
            serverLastTimeRef.current = now;
          }
        }
        return;
      }

      const data = JSON.parse(event.data);
      switch (data.status) {
        case 'frameMetadata':
          currentFrameNumberRef.current = data.frame_number;
          setStreamType(data.stream_type);
          if (data.stream_type === 'non-dealing') {
            updateTimerState('betting', 20000);
          }
          break;
        case 'transition':
          handleTransition(data.transition_type, data.duration);
          if (data.transition_type === 'fade') {
            updateTimerState('cardDealing', 3000);
          }
          break;
        case 'card_placed':
          console.log(`Card placed: ${data.card} at frame ${data.frame_number}`);
          setDealtCount(prev => prev + 1);
          updateTimerState('cardDealing', 3000);
          break;
        case 'duration':
          if (data.phase === 'final_dealing') {
            updateTimerState('completed', data.duration);
          }
          break;
        case 'error':
          setError(data.message);
          break;
        default:
          console.log('Unhandled message type:', data.status);
      }
    } catch (err) {
      console.error('Error processing message:', err);
    }
  };

  const handleTimerComplete = () => {
    console.log(`Timer completed for phase: ${timerState.phase}`);
    setTimerState(prev => ({ ...prev, isActive: false }));
  };

  // Renders the current frame onto the canvas.
  const renderFrameToCanvas = (frameData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    const config = deviceConfig.current;
    if (config.quality === 'low') {
      canvas.width = Math.floor(600 * config.resolution);
      canvas.height = Math.floor(300 * config.resolution);
      canvas.style.width = '600px';
      canvas.style.height = '300px';
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (frameData.bitmap) {
      const scale = Math.min(
        canvas.width / frameData.bitmap.width,
        canvas.height / frameData.bitmap.height
      );
      const x = (canvas.width - frameData.bitmap.width * scale) / 2;
      const y = (canvas.height - frameData.bitmap.height * scale) / 2;
      ctx.drawImage(
        frameData.bitmap,
        x, y,
        frameData.bitmap.width * scale,
        frameData.bitmap.height * scale
      );
    } else if (frameData.img) {
      ctx.drawImage(frameData.img, 0, 0, canvas.width, canvas.height);
      if (frameData.url) {
        URL.revokeObjectURL(frameData.url);
      }
    }
  };

  // Start the optimized hybrid render loop.
  const startRenderLoop = () => {
    frameProcessorRef.current?.startHybridRendering((frameData) => {
      renderFrameToCanvas(frameData);
      frameCountRef.current++;
      const now = Date.now();
      if (now - frameTimeRef.current >= 1000) {
        setStats(prev => ({
          ...prev,
          displayFps: frameCountRef.current,
          frameLag: frameProcessorRef.current?.bufferLength || 0,
        }));
        frameCountRef.current = 0;
        frameTimeRef.current = now;
      }
    });
  };

  const handleTransition = (transitionType, duration) => {
    if (transitionType === 'fade' && overlayRef.current) {
      setIsTransitioning(true);
      const overlay = overlayRef.current;
      overlay.style.transition = `opacity ${duration / 2}ms ease-in`;
      overlay.style.opacity = '1';
      setTimeout(() => {
        overlay.style.transition = `opacity ${duration / 2}ms ease-out`;
        overlay.style.opacity = '0';
        setTimeout(() => setIsTransitioning(false), duration / 2);
      }, duration / 2);
    }
  };

  const initializeWebSocket = () => {
    try {
      const config = deviceConfig.current;
      // You may add config.maxBufferSize or config.maxLagMs here for further tuning.
      frameProcessorRef.current = new FrameProcessor(config);
      wsRef.current = new WebSocket(`${baseURL}?config=${JSON.stringify(config)}`);
      wsRef.current.onopen = () => {
        setIsConnected(true);
        setError(null);
        if (roundId) {
          wsRef.current.send(JSON.stringify({
            joinVideoStream: roundId,
            deviceConfig: config
          }));
        }
      };
      wsRef.current.onclose = () => setIsConnected(false);
      wsRef.current.onerror = () => {
        setError('Failed to connect to video stream');
        setIsConnected(false);
      };
      wsRef.current.onmessage = handleWebSocketMessage;
    } catch (err) {
      console.error('WebSocket initialization error:', err);
      setError('Failed to initialize video stream');
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenTimeRef.current = Date.now();
      } else {
        const hiddenDuration = Date.now() - hiddenTimeRef.current;
        if (hiddenTimeRef.current > 0 && hiddenDuration > refreshThreshold) {
          window.location.reload();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    initializeWebSocket();
    startRenderLoop();
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (frameProcessorRef.current) {
        frameProcessorRef.current.clear();
      }
    };
  }, [roundId]);

  return (
    <div className={styles.simulationContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {!isConnected && !error && (
        <div className={styles.loadingMessage}>Connecting...</div>
      )}
      {isDevelopment && (
        <div className={styles.stats}>
          <div>Phase: {timerState.phase}</div>
          <div>Duration: {timerState.duration}s</div>
          <div>Cards Dealt: {dealtCount}</div>
          <div>Display FPS: {stats.displayFps}</div>
          <div>Buffer Size: {stats.frameLag}</div>
          <div>Server FPS: {stats.serverFps}</div>
          <div>
            Device: {DeviceCapabilities.isLowEndDevice() ? 'Low-end' : 'High-end'}
          </div>
          <div>Quality: {deviceConfig.current.quality}</div>
        </div>
      )}
      <div className={styles.videoContainer}>
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className={styles.videoCanvas}
        />
        <div
          ref={overlayRef}
          className={styles.overlay}
          style={{
            opacity: 0,
            transition: 'opacity 500ms ease-in-out',
          }}
        />
      </div>
      <div className={styles.controlsOverlay}>
        <div className={styles.topRightControls}>
          <button
            className={styles.controlButton}
            onClick={() => (window.location.href = '/')}
            title="Home"
          >
            🏠
          </button>
          <button
            className={styles.controlButton}
            onClick={() => {
              /* Add info modal logic here */
            }}
            title="Information"
          >
            ℹ️
          </button>
        </div>
        <div className={styles.bottomRightTimer}>
          {timerState.isActive && (
            <CountdownTimer
              initialTime={timerState.duration}
              phase={timerState.phase}
              onComplete={handleTimerComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
