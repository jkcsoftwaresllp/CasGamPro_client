export class FrameProcessor {
  constructor(config) {
    this.config = config;
    this.frameBuffer = [];
    this.processedFrames = new Set();
    this.lastFrameTime = 0;
    this.frameInterval = 1000 / config.frameRate;
    this.maxLagMs = config.maxLagMs || this.frameInterval * 2;
    this.renderCallback = null;
    // Worker for decoding frames
    this.worker = new Worker(new URL('./decodeWorker.js', import.meta.url), { type: 'module' });
    this.worker.onmessage = this._handleWorkerMessage.bind(this);
    this.workerCallbackMap = new Map();
    // Hybrid loop variables:
    this._rafId = null;
    this._intervalId = null;
    this._isRendering = false;
    this._visibilityHandler = null;
  }

  /* Use worker to decode the frame. Returns a promise that resolves with the decoded frame data. */
  async processFrame(blob, frameNumber) {
    // Drop new frame if near capacity.
    if (this.frameBuffer.length > this.config.bufferSize * 0.8) return null;
    if (this.processedFrames.has(frameNumber)) return null;
    this.processedFrames.add(frameNumber);

    return new Promise((resolve, reject) => {
      // Store callback so that when worker responds, we resolve the promise.
      this.workerCallbackMap.set(frameNumber, resolve);
      // Post a message to the worker: send the blob and frame number.
      this.worker.postMessage({ blob, frameNumber });
    });
  }

  _handleWorkerMessage(event) {
    const data = event.data;
    // If an error occurred, you might log or handle it.
    if (data.error) {
      console.error('Worker decoding error:', data.error);
      this.workerCallbackMap.delete(data.frameNumber);
      return;
    }
    const resolve = this.workerCallbackMap.get(data.frameNumber);
    if (resolve) {
      resolve({ frameNumber: data.frameNumber, bitmap: data.bitmap, timestamp: data.timestamp });
      this.workerCallbackMap.delete(data.frameNumber);
    }
  }

  addFrame(frameData) {
    if (this.frameBuffer.length >= this.config.maxBufferSize) {
      console.warn('Buffer full, dropping one oldest frame');
      this.frameBuffer.shift();
    }
    this.frameBuffer.push(frameData);
  }

  getNextFrame() {
    const now = Date.now();
    while (
      this.frameBuffer.length > 1 &&
      now - this.frameBuffer[0].timestamp > this.maxLagMs
    ) {
      console.warn('Dropping frame due to lag:', now - this.frameBuffer[0].timestamp, 'ms behind');
      this.frameBuffer.shift();
    }
    return this.frameBuffer.shift();
  }

  startHybridRendering(callback) {
    this.renderCallback = callback;
    this.lastFrameTime = performance.now();
    this._isRendering = true;

    const loop = () => {
      if (!this._isRendering) return;
      const now = performance.now();
      if (now - this.lastFrameTime >= this.frameInterval) {
        let frameData = null;
        while ((frameData = this.getNextFrame())) {
          this.renderCallback(frameData);
        }
        this.lastFrameTime = now;
      }
    };

    const rafLoop = () => {
      if (!this._isRendering) return;
      loop();
      this._rafId = requestAnimationFrame(rafLoop);
    };

    if (!document.hidden) {
      this._rafId = requestAnimationFrame(rafLoop);
    } else {
      this._intervalId = setInterval(loop, this.frameInterval);
    }

    this._visibilityHandler = () => {
      if (document.hidden) {
        if (this._rafId) {
          cancelAnimationFrame(this._rafId);
          this._rafId = null;
        }
        if (!this._intervalId) {
          this._intervalId = setInterval(loop, this.frameInterval);
        }
      } else {
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
    // Terminate worker if desired.
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  get bufferLength() {
    return this.frameBuffer.length;
  }

  resetBuffer() {
      this.frameBuffer = [];
      this.processedFrames.clear();
    }

  clear() {
    this.stopHybridRendering();
    this.frameBuffer = [];
    this.processedFrames.clear();
  }
}
