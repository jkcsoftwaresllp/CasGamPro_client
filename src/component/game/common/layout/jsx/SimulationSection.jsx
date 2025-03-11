import React, { useEffect, useRef, useState } from "react";
import styles from "../style/SimulationSection.module.css";
import { useGameState } from "../helper/GameStateContext";

export const SimulationSection = ({ gameType }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null); 
  const wsRef = useRef(null);
  const gameState = useGameState();
  const { roundId } = gameState;
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Latest frame data received from WebSocket
  const latestFrameRef = useRef(null);
  
  // Animation frame request ID
  const animationFrameId = useRef(null);
  
  // For FPS tracking
  const [displayFps, setDisplayFps] = useState(0);
  const frameTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);
  
  const hiddenTimeRef = useRef(0);
  const refreshThreshold = 3000;

  const isDevelopment = import.meta.env.DEV;
  const productionIP = "88.222.214.174";

  const baseURL = isDevelopment
    ? "ws://localhost:5500"
    : `ws://${productionIP}:5500`;

  const [isTransitioning, setIsTransitioning] = useState(false);
  
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
        setTimeout(() => {
          setIsTransitioning(false);
        }, duration / 2);
      }, duration / 2);
    }
  };

  // Visibility change detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenTimeRef.current = Date.now();
        // Cancel animation frame when tab is hidden to save resources
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      } else {
        const hiddenDuration = Date.now() - hiddenTimeRef.current;
        if (hiddenTimeRef.current > 0 && hiddenDuration > refreshThreshold) {
          window.location.reload();
        } else {
          // Restart rendering loop
          if (!animationFrameId.current) {
            startRenderLoop();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // WebSocket connection
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

        wsRef.current.onmessage = (event) => {
          if (!mounted) return;
          try {
            const data = JSON.parse(event.data);
            
            if (data.status === "frame") {
              // Just store the latest frame, don't render immediately
              latestFrameRef.current = data;
            } else if (data.status === "transition") {
              handleTransition(data.transition_type, data.duration);
            } else if (data.status === "card_placed") {
              console.log(`Card placed: ${data.card} at frame ${data.frame_number}`);
              // Pass this to your game state handler directly
              if (typeof gameState.handleCardPlacement === 'function') {
                gameState.handleCardPlacement(data.card);
              }
            }
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
    
    // Start the render loop
    startRenderLoop();

    return () => {
      mounted = false;
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      // Clean up animation frame
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [roundId]);

  // Consistent 30 FPS render loop
  const startRenderLoop = () => {
    let lastFrameTime = 0;
    const frameInterval = 1000 / 30; // 33.33ms for 30 FPS
    
    const renderFrame = (timestamp) => {
      // Calculate time since last frame
      const elapsed = timestamp - lastFrameTime;
      
      // Only render if enough time has passed for 30 FPS
      if (elapsed >= frameInterval) {
        lastFrameTime = timestamp - (elapsed % frameInterval); // Adjust for timing precision
        
        // Render the latest frame if available
        if (latestFrameRef.current) {
          renderVideoFrame(latestFrameRef.current);
        }
        
        // FPS calculation
        frameCountRef.current++;
        const now = Date.now();
        if (now - frameTimeRef.current >= 1000) {
          setDisplayFps(frameCountRef.current);
          frameCountRef.current = 0;
          frameTimeRef.current = now;
        }
      }
      
      // Continue the loop
      animationFrameId.current = requestAnimationFrame(renderFrame);
    };
    
    // Start the loop
    animationFrameId.current = requestAnimationFrame(renderFrame);
  };

  // Actual frame rendering function
  const renderVideoFrame = (data) => {
    if (!data || !data.frame_data) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height,
      );
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
    img.onerror = (e) => {
      console.error("Failed to load frame image:", e);
      setError("Failed to load video frame");
    };
    img.src = `data:image/jpeg;base64,${data.frame_data}`;
  };

  return (
    <div className={styles.simulationContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {!isConnected && !error && (
        <div className={styles.loadingMessage}>
          Connecting to video stream...
        </div>
      )}
      
      {/* Display the FPS counter */}
      <div className={styles.fpsCounter}>
        Display: {displayFps} FPS
      </div>
      
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={900}
          height={600}
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
      </div>
    </div>
  );
};
