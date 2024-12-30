export const FULL_DASH_ARRAY = 283;

export const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: 10,
  },
  alert: {
    color: "red",
    threshold: 5,
  },
};

export const calculateTimeFraction = (timeLeft, time) => {
  const rawTimeFraction = timeLeft / time;
  return rawTimeFraction - (1 / time) * (1 - rawTimeFraction);
};

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${seconds}`;
};

export const getRemainingPathColor = (timeLeft) => {
  const { alert, warning, info } = COLOR_CODES;

  if (timeLeft <= alert.threshold) {
    return "red";
  } else if (timeLeft <= warning.threshold) {
    return "orange";
  } else {
    return "green";
  }
};
