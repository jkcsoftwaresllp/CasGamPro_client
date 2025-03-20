import React, { useEffect, useRef, useState } from 'react';
import styles from '../style/SimulationSection.module.css';
import { useGameState } from '../helper/GameStateContext';
import { DeviceCapabilities } from '../helper/devices.js';
import { FrameProcessor } from '../helper/frames.js';

export const SimulationSection = ({ gameType }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const wsRef = useRef(null);
  const gameState = useGameState();
  const { roundId } = gameState;

  const [streamType, setStreamType] = useState(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const deviceConfig = useRef(DeviceCapabilities.getDeviceConfig());
  const frameProcessorRef = useRef(null);
  const animationFrameId = useRef(null);
  const currentFrameNumberRef = useRef(0);
  const hiddenTimeRef = useRef(0);

  const [stats, setStats] = useState({
    displayFps: 0,
    frameLag: 0,
    serverFps: 0,
  });

  const frameTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);
  const serverFrameCountRef = useRef(0);
  const serverLastTimeRef = useRef(Date.now());

  const isDevelopment = process.env.NODE_ENV === 'development';
  const productionIP = '88.222.214.174';
  const baseURL = isDevelopment ? 'ws://localhost:5500' : `ws://${productionIP}:5500`;
  const refreshThreshold = 3000;

  const renderFrameToCanvas = (frameData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const config = deviceConfig.current;
    
    // Set canvas size based on device capabilities
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

  const startRenderLoop = () => {
    const renderFrame = (timestamp) => {
      if (frameProcessorRef.current?.shouldRenderFrame(timestamp)) {
        const frameData = frameProcessorRef.current.getNextFrame();
        
        if (frameData) {
          renderFrameToCanvas(frameData);
          
          // Update stats
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
        }
      }

      animationFrameId.current = requestAnimationFrame(renderFrame);
    };

    animationFrameId.current = requestAnimationFrame(renderFrame);
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
      frameProcessorRef.current = new FrameProcessor(config);

      wsRef.current = new WebSocket(`${baseURL}?config=${JSON.stringify(config)}`);

      wsRef.current.onopen = () => {
        setIsConnected(true);
        setError(null);
        if (roundId) {
          wsRef.current?.send(JSON.stringify({
            joinVideoStream: roundId,
            deviceConfig: config
          }));
        }
      };

      wsRef.current.onclose = () => {
        setIsConnected(false);
      };

      wsRef.current.onerror = () => {
        setError('Failed to connect to video stream');
        setIsConnected(false);
      };

      wsRef.current.onmessage = async (event) => {
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

          // Handle JSON messages
          const data = JSON.parse(event.data);
          
          if (data.status === 'error') {
            setError(data.message);
            return;
          }

          if (data.status === 'frameMetadata') {
            currentFrameNumberRef.current = data.frame_number;
            setStreamType(data.stream_type);
          }

          if (data.status === 'transition') {
            handleTransition(data.transition_type, data.duration);
          }
        } catch (err) {
          console.error('Error processing message:', err);
        }
      };
    } catch (err) {
      console.error('WebSocket initialization error:', err);
      setError('Failed to initialize video stream');
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenTimeRef.current = Date.now();
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      } else {
        const hiddenDuration = Date.now() - hiddenTimeRef.current;
        if (hiddenTimeRef.current > 0 && hiddenDuration > refreshThreshold) {
          window.location.reload();
        } else if (!animationFrameId.current) {
          startRenderLoop();
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
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      frameProcessorRef.current?.clear();
    };
  }, [roundId]);

  return (
    <div className={styles.simulationContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {!isConnected && !error && <div className={styles.loadingMessage}>Connecting...</div>}

      {isDevelopment && (
        <div className={styles.stats}>
          <div>Display FPS: {stats.displayFps}</div>
          <div>Buffer Size: {stats.frameLag}</div>
          <div>Server FPS: {stats.serverFps}</div>
          <div>Device: {DeviceCapabilities.isLowEndDevice() ? 'Low-end' : 'High-end'}</div>
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
    </div>
  );
};