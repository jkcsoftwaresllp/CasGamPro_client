export class FrameProcessor {
    constructor(config) {
      this.config = config;
      this.frameBuffer = [];
      this.processedFrames = new Set();
      this.lastFrameTime = 0;
      this.frameInterval = 1000 / config.frameRate;
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
        
        if (this.config.quality === 'low') {
          const url = URL.createObjectURL(blob);
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
            img.src = url;
          });
          return { frameNumber, img, url };
        } else {
          const bitmap = await createImageBitmap(blob);
          return { frameNumber, bitmap };
        }
      } catch (error) {
        console.error('Frame processing error:', error);
        this.processedFrames.delete(frameNumber);
        return null;
      }
    }
  
    addFrame(frameData) {
      if (this.frameBuffer.length < this.config.maxBufferSize) {
        this.frameBuffer.push(frameData);
      }
    }
  
    getNextFrame() {
      return this.frameBuffer.shift();
    }
  
    shouldRenderFrame(timestamp) {
      if (timestamp - this.lastFrameTime >= this.frameInterval) {
        this.lastFrameTime = timestamp - (timestamp % this.frameInterval);
        return true;
      }
      return false;
    }
  
    get bufferLength() {
      return this.frameBuffer.length;
    }
  
    clear() {
      this.frameBuffer = [];
      this.processedFrames.clear();
    }
  }