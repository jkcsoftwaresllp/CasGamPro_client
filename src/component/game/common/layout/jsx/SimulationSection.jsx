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

  useEffect(() => {
    let mounted = true;

    const initializeSocket = () => {
      try {
        // Create socket connection using the video namespace
        socketRef.current = io("http://localhost:4320/video", {
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socketRef.current.on("connect", () => {
          console.log("Connected to video stream");
          setIsConnected(true);
          setError(null);
          console.info(`Joining stream for round ${roundId}`);
          socketRef.current.emit("joinVideoStream", roundId);
        });

        socketRef.current.on("connect_error", (err) => {
          console.error("Connection error:", err);
          setError("Failed to connect to video stream");
          setIsConnected(false);
        });

        // Handle non-dealing video frames
        socketRef.current.on("videoFrame", (data) => {
          if (mounted) {
            handleVideoFrame(data, "non-dealing");
          }
        });

        // Handle dealing frames (if sent separately)
        socketRef.current.on("dealingFrame", (data) => {
          if (mounted) {
            handleVideoFrame(data, "dealing");
          }
        });

        socketRef.current.on("error", (err) => {
          console.error("Socket error:", err);
          setError("Video stream error occurred");
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

    return () => {
      mounted = false;
      if (socketRef.current) {
        if (!roundId) {
          console.error("ROUNDID NOT FOUND FIX!!");
        }
        socketRef.current.emit("leaveVideoStream", roundId);
        socketRef.current.disconnect();
      }
    };
  }, [roundId]);

  // Render incoming video frame to the canvas
  const handleVideoFrame = (data, frameType) => {
    console.log(`Received ${frameType} frame ${data.frameNumber}`);

    if (!data || !data.frameData) {
      console.error("Received empty frame data");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const img = new Image();

      img.onload = () => {
        // Clear the canvas before drawing the new frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Optionally, fill the canvas with a background color if needed:
        // ctx.fillStyle = "#fff";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Scale image to fit while maintaining aspect ratio
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      };

      img.onerror = (e) => {
        console.error("Failed to load frame image:", e);
        setError("Failed to load video frame");
      };

      // Set image source via base64 string
      img.src = `data:image/jpeg;base64,${data.frameData}`;
    } catch (err) {
      console.error("Error processing frame:", err);
      setError("Error processing video frame");
    }
  };

  return (
    <div className={styles.simulationContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {!isConnected && !error && (
        <div className={styles.loadingMessage}>Connecting to video stream...</div>
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
