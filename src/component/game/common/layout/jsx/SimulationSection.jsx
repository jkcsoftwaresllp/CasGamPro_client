import React, { useEffect, useRef, useState } from "react";
import styles from "../style/SimulationSection.module.css";
import { useGameState } from "../helper/GameStateContext";

export const SimulationSection = ({ gameType }) => {
  const canvasRef = useRef(null);
  const wsRef = useRef(null); // Change to use native WebSocket
  const gameState = useGameState();
  const { roundId } = gameState;
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeWebSocket = () => {
      try {
        // Use native WebSocket instead of Socket.IO
        wsRef.current = new WebSocket('ws://localhost:8000');

        wsRef.current.onopen = () => {
          console.log("Connected to video stream");
          setIsConnected(true);
          setError(null);
          
          // Send join message in the format the Rust server expects
          if (roundId) {
            wsRef.current.send(JSON.stringify({
              joinVideoStream: roundId
            }));
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
          if (mounted) {
            try {
              const data = JSON.parse(event.data);
              // Check for frame message format from Rust server
              if (data.status === 'frame') {
                handleVideoFrame(data);
              }
            } catch (err) {
              console.error("Error processing message:", err);
            }
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

  // Simplified handleVideoFrame since we don't need frameType anymore
  const handleVideoFrame = (data) => {
    console.log(`Received frame ${data.frame_number}`);

    if (!data || !data.frame_data) {
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
          canvas.height / img.height
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
