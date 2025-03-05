import React from "react";
import styles from "../styles/BetInRectangle.module.css";
import { LockOverlay } from "./LockOverlay";

export const BetInRectangle = ({
  label,
  betProfit,
  betAmount,
  onClick,
  isLock,
  paddingLeft = "5px",
  paddingRight = "5px",
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
        <div className={styles.betProfit}>
          <p>{label}</p>
          <p>{betProfit}</p>
        </div>
        <p className={styles.labelBetAmount}>{betAmount}</p>
        {isLock && <LockOverlay />}
      </div>
    </>
  );
};
