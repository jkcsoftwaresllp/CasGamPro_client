import { useEffect, useState } from "react";
import style from "./style/Timer.module.css";
import {
  FULL_DASH_ARRAY,
  calculateTimeFraction,
  formatTime,
  getRemainingPathColor,
} from "./helper/helper";

const Timer = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [remainingPathColor, setRemainingPathColor] = useState("green");

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    setRemainingPathColor(getRemainingPathColor(timeLeft));
  }, [timeLeft]);

  const circleDasharray = `${(
    calculateTimeFraction(timeLeft, time) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;

  const remainingPathColorClass =
    remainingPathColor === "green"
      ? style.green
      : remainingPathColor === "orange"
      ? style.orange
      : style.red;

  return (
    <div className={style.baseTimer}>
      <svg
        className={style.baseTimerSvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={style.baseTimerCircle}>
          <circle
            className={style.baseTimerPathElapsed}
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            strokeDasharray={circleDasharray}
            className={`${style.baseTimerPathRemaining} ${remainingPathColorClass}`}
            d="M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0"
          ></path>
        </g>
      </svg>
      <span className={style.baseTimerLabel}>{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;
import { useEffect, useState } from "react";
import style from "./style/Timer.module.css";
import {
  FULL_DASH_ARRAY,
  calculateTimeFraction,
  formatTime,
  getRemainingPathColor,
} from "./helper/helper";

const Timer = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [remainingPathColor, setRemainingPathColor] = useState("green");

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    setRemainingPathColor(getRemainingPathColor(timeLeft));
  }, [timeLeft]);

  const circleDasharray = `${(
    calculateTimeFraction(timeLeft, time) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;

  const remainingPathColorClass =
    remainingPathColor === "green"
      ? style.baseTimerPathRemainingGreen
      : remainingPathColor === "orange"
      ? style.baseTimerPathRemainingOrange
      : style.baseTimerPathRemainingRed;

  return (
    <div className={style.baseTimer}>
      <svg
        className={style.baseTimerSvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={style.baseTimerCircle}>
          <circle
            className={style.baseTimerPathElapsed}
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            id="baseTimerPathRemaining"
            strokeDasharray={circleDasharray}
            className={`${style.baseTimerPathRemaining} ${remainingPathColorClass}`}
            d="M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0"
          ></path>
        </g>
      </svg>
      <span className={style.baseTimerLabel}>{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;
