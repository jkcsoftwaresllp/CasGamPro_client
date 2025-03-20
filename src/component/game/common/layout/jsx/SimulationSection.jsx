import React, { useEffect, useRef, useState } from "react";
import styles from "../style/SimulationSection.module.css";
import { useGameState } from "../helper/GameStateContext";

// Determine WebSocket URL based on environment.
const isDevelopment = import.meta.env.DEV;
const productionIP = "88.222.214.174";
const baseURL = isDevelopment
  ? "ws://localhost:5500"
  : `ws://${productionIP}:5500`;

export const SimulationSection = ({ gameType }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const wsRef = useRef(null);
  const workerRef = useRef(null);
  const gameState = useGameState();
  const { roundId } = gameState;

  // FPS & statistics (optional)
  const [stats, setStats] = useState({
    displayFps: 0,
    serverFps: 0,
    frameLag: 0,
  });
  const serverFrameCountRef = useRef(0);
  const serverLastTimeRef = useRef(Date.now());

  // A simple frame buffer limit.
  const maxBufferSize = 5;
  const frameBufferRef = useRef([]);

  // Set up the Web Worker and initialize OffscreenCanvas rendering.
  useEffect(() => {
    // Using new URL() ensures that bundlers (like Vite) can locate your worker.
    try {
      workerRef.current = new Worker(
        new URL("../helper/videoWorker.js", import.meta.url)
      );
    } catch (e) {
      console.error("Error creating worker:", e);
      return;
    }
    
    if (canvasRef.current && canvasRef.current.transferControlToOffscreen) {
      const offscreen = canvasRef.current.transferControlToOffscreen();
      workerRef.current.postMessage(
        {
          command: "init",
          canvas: offscreen,
          width: canvasRef.current.width,
          height: canvasRef.current.height,
          targetFps: 15,
        },
        [offscreen]
      );
    } else {
      // Fallback if OffscreenCanvas is not supported.
      workerRef.current.postMessage({
        command: "init",
        width: canvasRef.current.width,
        height: canvasRef.current.height,
        targetFps: 15,
      });
    }
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  // Instantiate the WebSocket and route incoming binary frames.
  useEffect(() => {
    let mounted = true;
    wsRef.current = new WebSocket(baseURL);
    wsRef.current.binaryType = "blob";

    wsRef.current.onopen = () => {
      console.info("Connected to video stream");
      if (roundId) {
        wsRef.current.send(
          JSON.stringify({
            joinVideoStream: roundId,
          })
        );
      }
    };

    wsRef.current.onmessage = async (event) => {
      if (!mounted) return;
      try {
        if (event.data instanceof Blob) {
          const bitmap = await createImageBitmap(event.data);
          // If using a buffer, check its current length.
          if (frameBufferRef.current.length < maxBufferSize && workerRef.current) {
            // Set up a message channel to optionally obtain acknowledgement.
            const mc = new MessageChannel();
            mc.port1.onmessage = (ev) => {
              // Optional: process ack (dropped/drawn info).
              // console.log("Worker ack:", ev.data);
            };
            workerRef.current.postMessage(
              {
                command: "renderFrame",
                bitmap,
                responsePort: mc.port2,
              },
              [bitmap, mc.port2]
            );
            serverFrameCountRef.current++;
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
          } else {
            bitmap.close();
          }
        } else {
          // Process text messages (metadata, etc.)
          const data = JSON.parse(event.data);
          if (data.status === "error") {
            console.error("Error from server:", data.message);
            return;
          }
          if (data.status === "frameMetadata") {
            // Store or update frame metadata if needed.
          }
        }
      } catch (err) {
        console.error("Error processing WebSocket message:", err);
      }
    };

    wsRef.current.onclose = () => console.info("Disconnected from video stream");
    wsRef.current.onerror = (err) => console.error("WebSocket error:", err);

    return () => {
      mounted = false;
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [roundId, baseURL]);

  // (Optional) Handle page visibility changes.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && wsRef.current) {
        wsRef.current.close();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className={styles.simulationContainer}>
      <canvas ref={canvasRef} width={600} height={300} className={styles.videoCanvas} />
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
        }}
      />
      <div className={styles.fpsCounter}>
        Display: {stats.displayFps} FPS | Server: {stats.serverFps} FPS
      </div>
    </div>
  );
};