class GameTimer {
  constructor(socket) {
    this.socket = socket;
    this.currentTimer = null;
    this.updateInterval = null;
  }

  connect(gameType) {
    this.socket.emit('joinTimer', gameType);

    this.socket.on('timerUpdate', (timerData) => {
      this.handleTimerUpdate(timerData);
    });
  }

  handleTimerUpdate(timerData) {
    this.currentTimer = timerData;
    this.startLocalTimer();
  }

  startLocalTimer() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    const startTime = this.currentTimer.timestamp;
    const duration = this.currentTimer.duration;

    this.updateInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = Math.max(0, duration - elapsed);

      if (remaining === 0) {
        clearInterval(this.updateInterval);
      }

      this.updateDisplay(remaining);
    }, 1000);
  }

  updateDisplay(remaining) {
    const seconds = Math.ceil(remaining / 1000);
    // Update your UI
    document.getElementById('timer').textContent =
      `${this.currentTimer.label}: ${seconds}s`;
  }

  cleanup() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    this.socket.off('timerUpdate');
  }
}

// Usage
const timerSocket = io('/timer');
const gameTimer = new GameTimer(timerSocket);

// When joining a game
gameTimer.connect(gameType);

// When leaving
gameTimer.cleanup();
