import React from "react";
import styles from "../styles/BetInRectangle.module.css";
import { LockOverlay } from "./LockOverlay";

export const BetInPair = ({
  label,
  betProfit,
  betAmount,
  onClick,
  isLock,
  paddingLeft = "20px",
  paddingRight = "20px",
}) => {
  const cssVariable = {
    "--paddingLeft": paddingLeft,
    "--paddingRight": paddingRight,
  };

  return (
    <div
      className={styles.betInPair}
      onClick={() => onClick(betProfit)}
      style={cssVariable}
    >
      <div className={styles.rowContainer}>
        <div className={styles.labelBetAmount}>
          <p>{label}</p>
        </div>
        <div className={styles.columnContainer}>
          <p className={styles.betProfit}>{betProfit}</p>
          <p className={styles.betAmount}>{betAmount}</p>
        </div>
      </div>
      {isLock && <LockOverlay />}
    </div>
  );
};
