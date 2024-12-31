import React from "react";
import styles from "../styles/BetInRectangle.module.css";
import { LockOverlay } from "./LockOverlay";

export const BetInRectangle = ({
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
    <>
      <div
        className={styles.betInRectangle}
        onClick={() => onClick(betProfit)}
        style={cssVariable}
      >
        <div className={styles.labelBetAmount}>
          <p>{label}</p>
          <p>{betAmount}</p>
        </div>
        <p className={styles.betProfit}>{betProfit}</p>
        {isLock && <LockOverlay />}
      </div>
    </>
  );
};
