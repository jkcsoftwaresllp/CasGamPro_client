// helper.js

import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend URL

// Function to setup the socket connection
export const setupSocket = (setFrameQueue, setIsPlaying) => {
  socket.emit("request-video-frames"); // Request video frames from the server

  socket.on("frame", (frameData) => {
    setFrameQueue((prevQueue) => [...prevQueue, frameData]); // Add frame to the buffer
  });

  socket.on("video-end", () => {
    setIsPlaying(false);
  });

  return () => {
    socket.off("frame");
    socket.off("video-end");
  };
};

// Function to handle frame playback
export const playFrames = (
  canvas,
  context,
  frameQueue,
  setFrameQueue,
  isPlaying
) => {
  if (frameQueue.length > 0 && isPlaying) {
    const frame = frameQueue.shift(); // Get the first frame in the queue
    const img = new Image();
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the frame
    };
    img.src = `data:image/jpeg;base64,${frame}`; // Decode the frame
    setFrameQueue([...frameQueue]); // Update the queue
  }
  requestAnimationFrame(() =>
    playFrames(canvas, context, frameQueue, setFrameQueue, isPlaying)
  );
};
