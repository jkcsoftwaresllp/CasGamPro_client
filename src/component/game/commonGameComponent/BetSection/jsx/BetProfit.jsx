import React from "react";
import styles from "../styles/BetPlacing.module.css";
import LockOverlay from "./LockOverlay";

const BetProfit = ({ betProfit, onClick, isLock }) => {
  return (
    <div className={styles.betProfit} onClick={() => onClick(betProfit)}>
      {betProfit}
      {isLock && <LockOverlay />}
    </div>
  );
};
export default BetProfit;
