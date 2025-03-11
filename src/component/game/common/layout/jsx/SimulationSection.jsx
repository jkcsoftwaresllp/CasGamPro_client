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
  
  // Reference to track when page was hidden
  const hiddenTimeRef = useRef(0);
  // Threshold in milliseconds (e.g., 3 seconds)
  const refreshThreshold = 3000;

  // Tracking frame rate from websocket
  const frameCountRef = useRef(0);
  const lastFpsUpdateRef = useRef(Date.now());
  const [receivedFps, setReceivedFps] = useState(0);

  const isDevelopment = import.meta.env.DEV;
  const productionIP = "88.222.214.174";

  const baseURL = isDevelopment
    ? "ws://localhost:5500"
    : `ws://${productionIP}:5500`;

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Setup FPS counter - updates the displayed FPS once per second
  useEffect(() => {
    const fpsInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastFpsUpdateRef.current;
      
      if (elapsed > 0) {
        // Calculate frames per second
        const fps = Math.round((frameCountRef.current * 1000) / elapsed);
        setReceivedFps(fps);
        
        // Reset counters
        frameCountRef.current = 0;
        lastFpsUpdateRef.current = now;
        
        // Log to console
        console.log(`WebSocket receiving at ${fps} frames per second`);
      }
    }, 1000);
    
    return () => clearInterval(fpsInterval);
  }, []);

  // Add visibility change detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is now hidden - record the time
        hiddenTimeRef.current = Date.now();
      } else {
        // Page is now visible again - check how long it was hidden
        const hiddenDuration = Date.now() - hiddenTimeRef.current;
        
        // If hidden for longer than our threshold, refresh the page
        if (hiddenTimeRef.current > 0 && hiddenDuration > refreshThreshold) {
          console.log(`Page was hidden for ${hiddenDuration}ms - refreshing`);
          window.location.reload();
        }
      }
    };

    // Add visibility change listener
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Clean up the listener when component unmounts
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Sample transition handler using a simple CSS fade overlay.
  const handleTransition = (transitionType, duration) => {
    if (transitionType === "fade") {
      const overlay = overlayRef.current;
      if (!overlay) return;

      setIsTransitioning(true);

      // Fade in (black screen)
      overlay.style.transition = `opacity ${duration / 2}ms ease-in`;
      overlay.style.opacity = "1";

      // After fade in, start fade out
      setTimeout(() => {
        overlay.style.transition = `opacity ${duration / 2}ms ease-out`;
        overlay.style.opacity = "0";

        // Clear transitioning state after complete fade
        setTimeout(() => {
          setIsTransitioning(false);
        }, duration / 2);
      }, duration / 2);
    }
  };

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
              // Increment frame counter for FPS calculation
              frameCountRef.current++;
              
              // Process frame as usual
              handleVideoFrame(data);
            } else if (data.status === "transition") {
              // Call the transition handler when a transition signal is received.
              handleTransition(data.transition_type, data.duration);
            } else if (data.status === "card_placed") {
              console.log(`Card placed event: ${data.card} at frame ${data.frame_number}`);
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

    return () => {
      mounted = false;
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [roundId]);

  const handleVideoFrame = (data) => {
    if (!data || !data.frame_data) {
      console.error("Received empty frame data");
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
      
      {/* Display the received FPS counter */}
      <div className={styles.fpsCounter}>
        Receiving: {receivedFps} FPS
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
