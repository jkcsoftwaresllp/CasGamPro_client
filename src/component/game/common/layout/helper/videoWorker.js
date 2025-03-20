"use strict";

// Listen for messages from the main thread.
self.onmessage = async (ev) => {
  try {
    if (ev.data && ev.data.command === "init") {
      // When initializing, we expect an OffscreenCanvas (if supported) to be transferred.
      if (ev.data.canvas) {
        self.canvas = ev.data.canvas;
        self.ctx = self.canvas.getContext("2d");
      } else {
        // Fallback: create our own OffscreenCanvas using the provided dimensions.
        self.canvas = new OffscreenCanvas(ev.data.width, ev.data.height);
        self.ctx = self.canvas.getContext("2d");
      }
      // Set target FPS (for low‑end devices, e.g., 15 FPS)
      self.targetFps = ev.data.targetFps || 15;
      self.frameInterval = 1000 / self.targetFps;
      self.lastRender = 0;
      // Log for debugging.
      console.log(
        `[worker] Initialized with dimensions ${ev.data.width}x${ev.data.height} @ ${self.targetFps} FPS`
      );
    } else if (ev.data && ev.data.command === "renderFrame" && ev.data.bitmap) {
      // Use MessagePort (sent as responsePort) to reply back if needed.
      const responsePort = ev.data.responsePort;
      const now = performance.now();
      if (now - self.lastRender < self.frameInterval) {
        // Too soon – drop this frame.
        responsePort.postMessage({ dropped: true });
        ev.data.bitmap.close();
        return;
      }
      self.lastRender = now;
      // Clear and draw the current frame scaled to our canvas dimensions.
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
      self.ctx.drawImage(
        ev.data.bitmap,
        0,
        0,
        self.canvas.width,
        self.canvas.height
      );
      // Let the main thread know the frame was drawn.
      responsePort.postMessage({ drawn: true });
      // Dispose the bitmap.
      ev.data.bitmap.close();
    }
  } catch (e) {
    console.error("[worker] Error processing message:", e);
  }
};