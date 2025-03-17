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
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Frames and buffering
  const currentFrameRef = useRef(0);
  const currentFrameNumberRef = useRef(0);
  const pendingCardRevealsRef = useRef({});
  const frameBufferRef = useRef([]);
  const maxBufferSize = 10; // Increased buffer size

  // FPS tracking and stats
  const [stats, setStats] = useState({
    displayFps: 0,
    frameLag: 0,
    serverFps: 0,
  });
  const frameTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);
  const serverFrameCountRef = useRef(0);
  const serverLastTimeRef = useRef(Date.now());

  // Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationFrameId = useRef(null);

  // For page visibility handling
  const hiddenTimeRef = useRef(0);
  const refreshThreshold = 3000;

  const productionIP = "88.222.214.174";
  const baseURL = isDevelopment
    ? "ws://localhost:5500"
    : `ws://${productionIP}:5500`;

  // Handle page visibility changes (pause/resume render loop)
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

  // Handle the fade transition effect
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

  // Render loop: display frames from the buffer to the canvas at a fixed FPS
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

  // Draw an ImageBitmap to the canvas, scaling to fit
  const renderFrameFromBitmap = (bitmap, frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(
      canvas.width / bitmap.width,
      canvas.height / bitmap.height
    );
    const x = (canvas.width - bitmap.width * scale) / 2;
    const y = (canvas.height - bitmap.height * scale) / 2;
    ctx.drawImage(bitmap, x, y, bitmap.width * scale, bitmap.height * scale);
  };

  // Setup WebSocket connection and message handling
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
              })
            );
            console.info(`Joining stream for round ${roundId}`);
          }
        };

        wsRef.current.onclose = () => {
          console.log("Disconnected from video stream");
          setIsConnected(false);
        };

        wsRef.current.onerror = (wsError) => {
          console.error("WebSocket error:", wsError);
          setError("Failed to connect to video stream");
          setIsConnected(false);
        };

        wsRef.current.onmessage = async (event) => {
          if (!mounted) return;
          try {
            // Process binary frame messages
            if (event.data instanceof Blob) {
              // Only process frames if not in non-dealing phase
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
                      (now - serverLastTimeRef.current)
                  );
                  setStats((prev) => ({ ...prev, serverFps: fps }));
                  serverFrameCountRef.current = 0;
                  serverLastTimeRef.current = now;
                }
              }
              return;
            }

            // Process text (JSON) messages
            const data = JSON.parse(event.data);

            // If error response received from VP, show the error message on-screen.
            if (data.status === "error") {
              console.error("Error received from server:", data.message);
              setError("Standback. Technical Error.");
              return; // May also want to halt further processing here.
            }

            if (data.status === "frameMetadata") {
              currentFrameNumberRef.current = data.frame_number;
              setStreamType(data.stream_type);
            }

            // Process card placement or other messages as needed…
            // For example, if you expect card placements:
            if (data.status === "card_placed") {
              const { card, frame_number } = data;
              // Save or process the card reveal for the given frame.
              if (!pendingCardRevealsRef.current[frame_number]) {
                pendingCardRevealsRef.current[frame_number] = [];
              }
              pendingCardRevealsRef.current[frame_number].push(card);
            }

            // Process other statuses as necessary...
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

  // JSX markup. Show error message if error state is set.
  return (
    <div className={styles.simulationContainer}>
      {!isConnected && !error && (
        <div className={styles.loadingMessage}></div>
      )}

      <div style={{ position: "relative" }}>
        {/* Render video canvas if there is a valid game and stream type */}
        {gameState.gameType ? (
          <>
            {streamType === "non-dealing" && (
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
                {error ? error : "Waiting for dealing to begin..."}
              </div>
            )}
            {streamType !== "non-dealing" && (
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

      {isDevelopment && (
        <div className={styles.fpsCounter}>
          Display: {stats.displayFps} FPS | Buffer: {stats.frameLag} frames | Server:{" "}
          {stats.serverFps} FPS
        </div>
      )}
    </div>
  );
};
