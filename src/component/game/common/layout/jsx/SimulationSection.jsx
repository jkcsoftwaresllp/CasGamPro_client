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
        socketRef.current = io("http://localhost:4320/video", {
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socketRef.current.on("connect", () => {
          console.log("Connected to video stream");
          setIsConnected(true);
          setError(null);

          // Join specific game type video stream
          console.info(`Joining ${roundId}`);
          socketRef.current.emit("joinVideoStream", roundId);
        });

        socketRef.current.on("connect_error", (err) => {
          console.error("Connection error:", err);
          setError("Failed to connect to video stream");
          setIsConnected(false);
        });

        // Handle both non-dealing and dealing frames
        socketRef.current.on("videoFrame", (data) => {
          if (mounted) {
            handleVideoFrame(data, "non-dealing");
          } else {
            console.log("not your day dawg");
            console.error("not your day dawg");
          }
        });

        socketRef.current.on("dealingFrame", (data) => {
          if (mounted) handleVideoFrame(data, "dealing");
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
        socketRef.current.emit("leaveVideoStream", roundId);
        socketRef.current.disconnect();
      }
    };
  }, [roundId]);

  const handleVideoFrame = (data, frameType) => {
    console.log(`Received frame ${data.frameNumber}`);

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

