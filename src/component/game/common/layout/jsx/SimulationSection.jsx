import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styles from "../style/SimulationSection.module.css";
import { useGameState } from "../helper/GameStateContext";

export const SimulationSection = ({ gameType }) => {
  const canvasRef = useRef(null);
  const gameState = useGameState();
  const { roundId } = gameState;
  const socketRef = useRef(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Refs for handling frame transitions
  const lastFrameTimeRef = useRef(null);
  const frameQueueRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const initializeSocket = () => {
      try {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }

        socketRef.current = io("http://localhost:4320/video", {
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socketRef.current.on("connect", () => {
          console.log("Connected to video stream");
          setIsConnected(true);
          setError(null);
          socketRef.current.emit("joinVideoStream", roundId);
        });

        socketRef.current.on("videoFrame", (data) => {
          if (mounted) {
            // Add frame to queue instead of rendering immediately
            frameQueueRef.current.push(data);
            if (!animationFrameRef.current) {
              processNextFrame();
            }
          }
        });

        socketRef.current.on("connect_error", (err) => {
          console.error("Connection error:", err);
          setError("Failed to connect to video stream");
          setIsConnected(false);
        });

        socketRef.current.on("disconnect", () => {
          console.log("Disconnected from video stream");
          setIsConnected(false);
        });
      } catch (err) {
        console.error("Socket initialization error:", err);
        setError("Failed to initialize video stream");
      }
    };

    initializeSocket();
    startFrameProcessing();

    return () => {
      mounted = false;
      if (socketRef.current) {
        socketRef.current.emit("leaveVideoStream", roundId);
        socketRef.current.disconnect();
      }
      stopFrameProcessing();
    };
  }, [roundId]);

  const startFrameProcessing = () => {
    const processFrame = () => {
      if (frameQueueRef.current.length > 0) {
        const now = Date.now();
        const timeSinceLastFrame = now - (lastFrameTimeRef.current || 0);

        // Maintain a minimum interval between frames (e.g., 30fps = ~33ms)
        if (timeSinceLastFrame >= 33) {
          const frame = frameQueueRef.current.shift();
          renderFrame(frame);
          lastFrameTimeRef.current = now;
        }
      }

      animationFrameRef.current = requestAnimationFrame(processFrame);
    };

    animationFrameRef.current = requestAnimationFrame(processFrame);
  };

  const stopFrameProcessing = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    frameQueueRef.current = [];
    lastFrameTimeRef.current = null;
  };

  const renderFrame = (data) => {
    if (!data || !data.frameData) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    img.src = `data:image/jpeg;base64,${data.frameData}`;
  };

  return (
    <div className={styles.simulationContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {!isConnected && !error && (
        <div className={styles.loadingMessage}>
          Connecting to video stream...
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className={styles.videoCanvas}
      />
    </div>
  );
};
