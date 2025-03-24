self.onmessage = async (event) => {
  // The worker expects a blob and the frameNumber.
  const { blob, frameNumber } = event.data;
  try {
    let bitmap;
    if (typeof createImageBitmap === 'function') {
      bitmap = await createImageBitmap(blob);
    } else {
      // Fallback: Create an offscreen canvas and draw.
      const offscreen = new OffscreenCanvas(1, 1);
      const ctx = offscreen.getContext('2d');
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      await img.decode();
      offscreen.width = img.width;
      offscreen.height = img.height;
      ctx.drawImage(img, 0, 0);
      bitmap = offscreen.transferToImageBitmap();
    }
    self.postMessage({ frameNumber, bitmap, timestamp: Date.now() }, [bitmap]);
  } catch (err) {
    self.postMessage({ error: err.message, frameNumber });
  }
};
