import React from "react";
import styles from "../styles/BetPlacing.module.css";
import { LockOverlay } from "./LockOverlay";

export const BetProfit = ({ betProfit, onClick, isLock }) => {
  return (
    <div className={styles.betProfit} onClick={() => onClick(betProfit)}>
      {betProfit}
      {isLock && <LockOverlay />}
    </div>
  );
};
