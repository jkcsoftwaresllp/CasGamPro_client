export class FrameProcessor {
  constructor(config) {
    this.config = config;
    this.frameBuffer = [];
    this.processedFrames = new Set();
    this.lastFrameTime = 0;
    this.frameInterval = 1000 / config.frameRate;
    this.renderCallback = null;
    // For hybrid loop management
    this._rafId = null;
    this._intervalId = null;
    this._isRendering = false;
    this._visibilityHandler = null;
  }

  async processFrame(blob, frameNumber) {
    if (this.frameBuffer.length > this.config.bufferSize * 0.8) {
      return null; // Drop frame if buffer is nearly full
    }

    if (this.processedFrames.has(frameNumber)) {
      return null; // Skip already processed frames
    }

    try {
      this.processedFrames.add(frameNumber);
      const timestamp = Date.now();

      if (this.config.quality === 'low') {
        const url = URL.createObjectURL(blob);
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = url;
        });
        return { frameNumber, img, url, timestamp };
      } else {
        const bitmap = await createImageBitmap(blob);
        return { frameNumber, bitmap, timestamp };
      }
    } catch (error) {
      console.error('Frame processing error:', error);
      this.processedFrames.delete(frameNumber);
      return null;
    }
  }

  addFrame(frameData) {
    // Drop frames if we're getting too far behind
    if (this.frameBuffer.length >= this.config.maxBufferSize) {
      console.warn('Buffer full, dropping frames');
      this.frameBuffer.shift(); // Remove oldest frame
    }
    this.frameBuffer.push(frameData);
  }

  getNextFrame() {
    // Drop old frames if we're falling behind
    const now = Date.now();
    while (
      this.frameBuffer.length > 1 &&
      now - this.frameBuffer[0].timestamp > this.frameInterval * 2
    ) {
      this.frameBuffer.shift();
    }
    return this.frameBuffer.shift();
  }

  // New hybrid render loop using requestAnimationFrame when visible and setInterval (with performance.now())
  startHybridRendering(callback) {
    this.renderCallback = callback;
    this.lastFrameTime = performance.now();
    this._isRendering = true;

    const loop = () => {
      if (!this._isRendering) return;

      const now = performance.now();
      // Only render a new frame if enough time has passed
      if (now - this.lastFrameTime >= this.frameInterval) {
        const frameData = this.getNextFrame();
        if (frameData) {
          this.renderCallback(frameData);
        }
        this.lastFrameTime = now;
      }
    };

    // Function to drive the rendering loop using RAF
    const rafLoop = () => {
      if (!this._isRendering) return;
      loop();
      this._rafId = requestAnimationFrame(rafLoop);
    };

    // Start either RAF or setInterval depending on current visibility
    if (!document.hidden) {
      this._rafId = requestAnimationFrame(rafLoop);
    } else {
      // Use a setInterval if page is hidden. Using performance.now() for timing.
      this._intervalId = setInterval(loop, this.frameInterval);
    }

    // Listen for visibility changes so we can switch the render method.
    this._visibilityHandler = () => {
      if (document.hidden) {
        // Stop any RAF and start an interval if not already running.
        if (this._rafId) {
          cancelAnimationFrame(this._rafId);
          this._rafId = null;
        }
        if (!this._intervalId) {
          this._intervalId = setInterval(loop, this.frameInterval);
        }
      } else {
        // Stop the interval and switch back to RAF.
        if (this._intervalId) {
          clearInterval(this._intervalId);
          this._intervalId = null;
        }
        this._rafId = requestAnimationFrame(rafLoop);
      }
    };

    document.addEventListener('visibilitychange', this._visibilityHandler);
  }

  stopHybridRendering() {
    this._isRendering = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    if (this._visibilityHandler) {
      document.removeEventListener('visibilitychange', this._visibilityHandler);
      this._visibilityHandler = null;
    }
  }

  get bufferLength() {
    return this.frameBuffer.length;
  }

  clear() {
    this.stopHybridRendering();
    this.frameBuffer = [];
    this.processedFrames.clear();
  }
}
