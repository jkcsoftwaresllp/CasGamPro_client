export class DeviceCapabilities {
    static isLowEndDevice() {
      return (
        window.navigator.hardwareConcurrency <= 2 || 
        navigator.deviceMemory <= 2 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    }
  
    static getDeviceConfig() {
      const isLowEnd = this.isLowEndDevice();
      return {
        bufferSize: isLowEnd ? 5 : 10,
        frameRate: isLowEnd ? 15 : 30,
        quality: isLowEnd ? 'low' : 'high',
        resolution: isLowEnd ? 0.5 : 1,
        maxBufferSize: isLowEnd ? 5 : 10,
        compressionQuality: isLowEnd ? 40 : 60
      };
    }
  }