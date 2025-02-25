import React from "react";
import styles from "../styles/BetWithText.module.css";
import { LockOverlay } from "./LockOverlay";

export const BetWithText = ({
  label,
  betProfit,
  betAmount,
  onClick,
  isLock,
}) => {
  return (
    <>
      <div className={styles.betWithText}>
        <p className={styles.betProfit}>{betProfit}</p>
        <div
          className={styles.bet}
          onClick={() => onClick(label.toLowerCase(), betProfit)}
        >
          <p>{label}</p>
          <p>{betAmount}</p>
          {isLock && <LockOverlay />}
        </div>
      </div>
    </>
  );
};
