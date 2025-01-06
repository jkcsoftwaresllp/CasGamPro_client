import React from "react";
import styles from "../styles/BetInRectangle.module.css";
import { LockOverlay } from "./LockOverlay";

export const BetInCircle = ({
  label,
  betProfit,
  betAmount,
  onClick,
  isLock,
}) => {
  return (
    <>
      <div className={styles.betInCircle} onClick={() => onClick(betProfit)}>
        <p>{label}</p>
        <p className={styles.betProfit}>{betProfit}</p>
        <p>{betAmount}</p>
        {isLock && <LockOverlay />}
      </div>
    </>
  );
};
