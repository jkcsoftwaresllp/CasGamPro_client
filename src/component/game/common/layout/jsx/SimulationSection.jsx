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
  
  // Track the current frame being displayed
  const currentFrameRef = useRef(0);
  
  // Store pending card reveals by frame number
  const pendingCardRevealsRef = useRef({});
  
  // Reference to track when page was hidden
  const hiddenTimeRef = useRef(0);
  const refreshThreshold = 3000;

  // Display stats
  const [stats, setStats] = useState({
    displayFps: 0,
    frameLag: 0
  });

  const isDevelopment = import.meta.env.DEV;
  const productionIP = "88.222.214.174";

  const baseURL = isDevelopment
    ? "ws://localhost:5500"
    : `ws://${productionIP}:5500`;

  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Animation frame request ID
  const animationFrameId = useRef(null);
  
  // Frame buffer - store received frames to ensure smooth playback
  const frameBufferRef = useRef([]);
  const maxBufferSize = 5; // Maximum frames to buffer
  
  // FPS tracking
  const frameTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);
  
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
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
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
    
    // Check if we have any card reveals for this frame or earlier frames
    for (let frame = 0; frame <= frameNumber; frame++) {
      if (pending[frame]) {
        // Process all cards for this frame
        pending[frame].forEach(card => {
          console.log(`Revealing card ${card} at frame ${frameNumber}`);
          if (typeof gameState.handleCardPlacement === 'function') {
            gameState.handleCardPlacement(card);
          }
        });
        
        // Remove processed reveals
        delete pending[frame];
      }
    }
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
        
        wsRef.current.onmessage = (event) => {
          if (!mounted) return;
          
          try {
            const data = JSON.parse(event.data);
            
            if (data.status === "frame") {
              // Add frame to buffer
              const buffer = frameBufferRef.current;
              buffer.push(data);
              
              // Keep buffer at a reasonable size
              while (buffer.length > maxBufferSize) {
                buffer.shift();
              }
            } else if (data.status === "transition") {
              handleTransition(data.transition_type, data.duration);
            } else if (data.status === "card_placed") {
              // Store card reveal for specific frame
              const frameNumber = data.frame_number;
              console.log(`Received card placement: ${data.card} at frame ${frameNumber}`);
              
              // Initialize the array for this frame if needed
              if (!pendingCardRevealsRef.current[frameNumber]) {
                pendingCardRevealsRef.current[frameNumber] = [];
              }
              
              // Add this card to the frame's reveal list
              pendingCardRevealsRef.current[frameNumber].push(data.card);
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
  
  // Render loop at consistent 30 FPS
  const startRenderLoop = () => {
    let lastFrameTime = 0;
    const frameInterval = 1000 / 30; // 33.33ms for 30 FPS
    
    const renderFrame = (timestamp) => {
      // Only render at a consistent framerate
      const elapsed = timestamp - lastFrameTime;
      
      if (elapsed >= frameInterval) {
        lastFrameTime = timestamp - (elapsed % frameInterval);
        
        const buffer = frameBufferRef.current;
        
        // Render from buffer if available
        if (buffer.length > 0) {
          const frameData = buffer.shift();
          currentFrameRef.current = frameData.frame_number;
          
          // Calculate frame lag for stats
          const bufferDepth = buffer.length;
          
          // Render the frame
          renderVideoFrame(frameData);
          
          // Process any card reveals for this frame
          processCardReveals(currentFrameRef.current);
          
          // FPS calculation
          frameCountRef.current++;
          const now = Date.now();
          if (now - frameTimeRef.current >= 1000) {
            setStats({
              displayFps: frameCountRef.current,
              frameLag: bufferDepth
            });
            frameCountRef.current = 0;
            frameTimeRef.current = now;
          }
        }
      }
      
      animationFrameId.current = requestAnimationFrame(renderFrame);
    };
    
    animationFrameId.current = requestAnimationFrame(renderFrame);
  };
  
  // Render a single video frame
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
      
      {/* Display performance stats */}
      <div className={styles.fpsCounter}>
        Display: {stats.displayFps} FPS | Buffer: {stats.frameLag} frames
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
