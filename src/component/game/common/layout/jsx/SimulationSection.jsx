import React, { useEffect, useRef, useState } from "react";
import styles from "../style/SimulationSection.module.css";
import { useGameState } from "../helper/GameStateContext";

const isDevelopment = import.meta.env.DEV;

export const SimulationSection = ({ gameType }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const wsRef = useRef(null);
  const gameState = useGameState();
  const { roundId } = gameState;

const [streamType, setStreamType] = useState(null);


const nonDealingValidGames = [
    // "LUCKY7B",
    // "DRAGON_TIGER",
    // "TEEN_PATTI",
    // "ANDAR_BAHAR",
    // "ANDAR_BAHAR_TWO",
    // "DRAGON_TIGER_LION",
    "DRAGON_TIGER_TWO",
    // "LUCKY7A",
  ];

  const validGames = [
    "LUCKY7B",
    "DRAGON_TIGER",
    // "TEEN_PATTI",
    // "ANDAR_BAHAR",
    // "ANDAR_BAHAR_TWO",
    // "DRAGON_TIGER_LION",
    "DRAGON_TIGER_TWO",
    // "LUCKY7A",
  ];
  const validGame = validGames.includes(gameState.gameType);
  const nonDealingAllowed = nonDealingValidGames.includes(gameState.gameType);

  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Track the current frame being displayed
  const currentFrameRef = useRef(0);
  // Track current frame number from metadata
  const currentFrameNumberRef = useRef(0);

  // Store pending card reveals by frame number
  const pendingCardRevealsRef = useRef({});

  // Reference to track when page was hidden
  const hiddenTimeRef = useRef(0);
  const refreshThreshold = 3000;

  // Display stats
  const [stats, setStats] = useState({
    displayFps: 0,
    frameLag: 0,
    serverFps: 0,
  });

  const productionIP = "88.222.214.174";

  const baseURL = isDevelopment
    ? "ws://localhost:5500"
    : `ws://${productionIP}:5500`;

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animation frame request ID
  const animationFrameId = useRef(null);

  // Frame buffer - store received frames to ensure smooth playback
  // Instead of storing blob URLs, we now store decoded ImageBitmaps.
  const frameBufferRef = useRef([]);
  const maxBufferSize = 10; // Increased buffer size

  // FPS tracking
  const frameTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);

  // Server FPS tracking
  const serverFrameCountRef = useRef(0);
  const serverLastTimeRef = useRef(Date.now());

  // Handle visibility change
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

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Handle transitions
  const handleTransition = (transitionType, duration) => {
    if (transitionType === "fade") {
      const overlay = overlayRef.current;
      if (!overlay) return;

      setIsTransitioning(true);
      overlay.style.transition = `opacity ${duration / 2}ms ease-in`;
      overlay.style.opacity = "1";

      setTimeout(() => {
        overlay.style.transition = `opacity ${duration / 2}ms ease-out`;
        overlay.style.opacity = "0";
        setTimeout(() => setIsTransitioning(false), duration / 2);
      }, duration / 2);
    }
  };

  // Process any pending card reveals for the current frame
  const processCardReveals = (frameNumber) => {
    const pending = pendingCardRevealsRef.current;
    Object.keys(pending).forEach((frameKey) => {
      const frame = parseInt(frameKey, 10);
      if (frame <= frameNumber) {
        pending[frameKey].forEach((card) => {
          console.log(`Revealing card ${card} at frame ${frameNumber}`);
          if (typeof gameState.handleCardPlacement === "function") {
            gameState.handleCardPlacement(card);
          }
        });
        delete pending[frameKey];
      }
    });
  };

  // Setup WebSocket connection
  useEffect(() => {
    let mounted = true;

    const initializeWebSocket = () => {
      try {
        wsRef.current = new WebSocket(baseURL);

        wsRef.current.onopen = () => {
          console.log("Connected to video stream");
          setIsConnected(true);
          setError(null);

          if (roundId) {
            wsRef.current.send(
              JSON.stringify({
                joinVideoStream: roundId,
              }),
            );
            console.info(`Joining stream for round ${roundId}`);
          }
        };

        wsRef.current.onclose = () => {
          console.log("Disconnected from video stream");
          setIsConnected(false);
        };

        wsRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
          setError("Failed to connect to video stream");
          setIsConnected(false);
        };

        wsRef.current.onmessage = async (event) => {
          if (!mounted) return;

          try {
            // Handle binary messages (frames)
            if (event.data instanceof Blob) {
              // Only process frames if we're not in non-dealing phase
              if (streamType !== "non-dealing") {
                serverFrameCountRef.current++;
                const bitmap = await createImageBitmap(event.data);

                if (frameBufferRef.current.length < maxBufferSize) {
                  frameBufferRef.current.push({
                    frame_number: currentFrameNumberRef.current,
                    bitmap,
                  });
                }

                const now = Date.now();
                if (now - serverLastTimeRef.current >= 1000) {
                  const fps = Math.round(
                    (serverFrameCountRef.current * 1000) /
                      (now - serverLastTimeRef.current),
                  );
                  setStats((prev) => ({ ...prev, serverFps: fps }));
                  serverFrameCountRef.current = 0;
                  serverLastTimeRef.current = now;
                }
              }
              return;
            }

            // Handle text messages (JSON)
            const data = JSON.parse(event.data);

            if (data.status === "frameMetadata") {
              currentFrameNumberRef.current = data.frame_number;
              setStreamType(data.stream_type);
            }
            // ... rest of the message handling code ...
          } catch (err) {
            console.error("Error processing message:", err);
          }
        };
      } catch (err) {
        console.error("WebSocket initialization error:", err);
        setError("Failed to initialize video stream");
      }
    };

    initializeWebSocket();
    startRenderLoop();

    // Cleanup on unmount
    return () => {
      mounted = false;
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [roundId]);

  // Render loop at a fixed rate
  const startRenderLoop = () => {
    let lastFrameTime = 0;
    const targetFps = 30; // Fixed target FPS
    const frameInterval = 1000 / targetFps;

    const renderFrame = (timestamp) => {
      const elapsed = timestamp - lastFrameTime;

      if (elapsed >= frameInterval) {
        lastFrameTime = timestamp - (elapsed % frameInterval);

        const buffer = frameBufferRef.current;

        if (buffer.length > 0) {
          const frameData = buffer.shift();
          currentFrameRef.current = frameData.frame_number;
          const bufferDepth = buffer.length;

          renderFrameFromBitmap(frameData.bitmap, frameData.frame_number);
          processCardReveals(currentFrameRef.current);

          frameCountRef.current++;
          const now = Date.now();
          if (now - frameTimeRef.current >= 1000) {
            setStats((prev) => ({
              ...prev,
              displayFps: frameCountRef.current,
              frameLag: bufferDepth,
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

  // Directly draw decoded ImageBitmap to the canvas
  const renderFrameFromBitmap = (bitmap, frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Clear the canvas and scale the image to fit
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(
      canvas.width / bitmap.width,
      canvas.height / bitmap.height,
    );
    const x = (canvas.width - bitmap.width * scale) / 2;
    const y = (canvas.height - bitmap.height * scale) / 2;

    ctx.drawImage(bitmap, x, y, bitmap.width * scale, bitmap.height * scale);
    // No need to revoke any URL because we’re using an ImageBitmap
  };

  return (
    <div className={styles.simulationContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {!isConnected && !error && <div className={styles.loadingMessage}></div>}

      {isDevelopment && (
        <div className={styles.fpsCounter}>
          Display: {stats.displayFps} FPS | Buffer: {stats.frameLag} frames |
          Server: {stats.serverFps} FPS
        </div>
      )}

      <div style={{ position: "relative" }}>
        {validGame ? (
          <>
            {streamType === "non-dealing" && !nonDealingAllowed ? (
              // Show only waiting text during non-dealing phase
              <div
                style={{
                  width: "900px",
                  height: "450px",
                  display: "grid",
                  placeItems: "center",
                  color: "blueviolet",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Waiting for dealing to begin...
              </div>
            ) : (
              // Show video canvas during dealing phase
              <>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={300}
                  className={styles.videoCanvas}
                />
                <div
                  ref={overlayRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "black",
                    opacity: 0,
                    pointerEvents: "none",
                    zIndex: 10,
                    transition: "opacity 500ms ease-in-out",
                  }}
                />
              </>
            )}
          </>
        ) : (
          <div className={styles.error}>
            <p>An error occurred while playing the video :(</p>
          </div>
        )}
      </div>
    </div>
  );
};
