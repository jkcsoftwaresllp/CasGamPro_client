import { useEffect, useRef, useState } from 'react';
import styles from '../style/SimulationSection.module.css';
import { useGameState } from '../helper/GameStateContext';
import { DeviceCapabilities } from '../helper/devices.js';
import { FrameProcessor } from '../helper/frames.js';
import { GameTimer } from './GameTimer.jsx';

const VALID_GAMES = [
    "LUCKY7A",
    "LUCKY7B",
    "DRAGON_TIGER_TWO",
    "TEEN_PATTI",
    // "DRAGON_TIGER",
];

export const SimulationSection = ({ gameType }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const wsRef = useRef(null);
  const gameState = useGameState();
  const correctGameType = gameState.gameType;
  const { roundId } = gameState;

  // Add new state variables at the top with other state declarations
  const [isWaitingForFrame, setIsWaitingForFrame] = useState(false);
  const lastFrameTimeRef = useRef(Date.now());

  const [isValidGame, setIsValidGame] = useState(false);

  const [streamType, setStreamType] = useState(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const deviceConfig = useRef(DeviceCapabilities.getDeviceConfig());
  const frameProcessorRef = useRef(null);
  const currentFrameNumberRef = useRef(0);
  const hiddenTimeRef = useRef(0);

  const [stats, setStats] = useState({
    displayFps: 0,
    frameLag: 0,
    serverFps: 0,
  });

  useEffect(() => {
          setIsValidGame(VALID_GAMES.includes(correctGameType));
      }, [correctGameType]);

  const frameCountRef = useRef(0);
  const frameTimeRef = useRef(Date.now());
  const serverFrameCountRef = useRef(0);
  const serverLastTimeRef = useRef(Date.now());

  const isDevelopment = import.meta.env.DEV;
  const productionIP = '88.222.214.174';
  const baseURL = isDevelopment ? 'ws://localhost:5500' : `ws://${productionIP}:5500`;
  const refreshThreshold = 3000;

  const handleWebSocketMessage = async (event) => {
    try {
      if (event.data instanceof Blob) {
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
        return;
      }

      const data = JSON.parse(event.data);

      // console.log("TRACK:", data);

      switch (data.status) {
        case 'frameMetadata':
          currentFrameNumberRef.current = data.frame_number;
          setStreamType(data.stream_type);
          if (data.stream_type === 'dealing') {
            setIsTransitioning(false);
          }
          break;
        case 'transition':
          frameProcessorRef.current?.resetBuffer();
          setIsTransitioning(true);
          setIsWaitingForFrame(true);
          break;
        case 'reset_countdown':
          // console.log(`Card placed: ${data.card} at frame ${data.frame_number}`);
          // setDealtCount(prev => prev + 1);
          // updateTimerState('cardDealing', 3000);
          break;
        case 'duration':
          console.log(`Timer duration updated: ${data.status}`);
          if (data.phase === 'waiting') {
            // updateTimerState('completed', data.duration);
          }
          if (data.phase === 'non-dealing') {
            // updateTimerState('betting', 20000);
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

  useEffect(() => {

    // console.info("Transition Triggered:", isTransitioning);

  }, [isTransitioning])

  // Renders the current frame onto the canvas.
  const renderFrameToCanvas = (frameData) => {

    // console.info("RENDERING TO CANVAS...");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Update last frame time
    lastFrameTimeRef.current = Date.now();

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

  // useEffect(() => {
  //   let safetyTimeout;
  //   if (isWaitingForFrame) {
  //     // If no frame arrives within 2 seconds, force complete the transition
  //     safetyTimeout = setTimeout(() => {
  //       if (isWaitingForFrame) {
  //         console.warn('Forcing transition completion due to timeout');
  //         handleFrameArrival();
  //       }
  //     }, 8000);
  //   }

  //   return () => {
  //     if (safetyTimeout) {
  //       clearTimeout(safetyTimeout);
  //     }
  //   };
  // }, [isTransitioning]);

  return (
          <div className={styles.simulationContainer}>
              {/* Main content area */}
              {!isValidGame ? (
                  <div className={styles.invalidGameContainer}>
                      <div className={styles.spinnerContainer}>
                          <div className={styles.spinner}></div>
                      </div>
                  </div>
              ) : (
                  <>
                      {error && <div className={styles.errorMessage}>{error}</div>}
                      {!isConnected && !error && (
                          <div className={styles.loadingMessage}>Connecting...</div>
                      )}
                      {isDevelopment && (
                          <div className={styles.stats}>
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
                          {isTransitioning && (
                              <div className={styles.spinnerContainer}>
                                  <div className={styles.spinner}></div>
                              </div>
                          )}
                      </div>
                  </>
              )}

              {/* Controls overlay - Now outside the conditional rendering */}
              <div className={styles.controlsOverlay}>
                  <div className={styles.topRightControls}>
                      <button
                          className={styles.controlButton}
                          onClick={() => (window.location.href = '/')}
                          title="Home"
                      >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                      </button>
                      <button
                          className={styles.controlButton}
                          onClick={() => {/* Add info modal logic here */}}
                          title="Information"
                      >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="16" x2="12" y2="12"></line>
                              <line x1="12" y1="8" x2="12.01" y2="8"></line>
                          </svg>
                      </button>
                  </div>
                  <div className={styles.bottomRightTimer}>
                    <GameTimer gameType={correctGameType} isValidGame={isValidGame} />
                  </div>
              </div>
          </div>
      );
};
