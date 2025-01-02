import React from "react";
import styles from "../styles/BetWithText.module.css";
import LockOverlay from "./LockOverlay";

const BetWithText = ({ label, betProfit, betAmount, onClick, isLock }) => {
  return (
    <>
      <div className={styles.betWithText}>
        <p className={styles.betProfit}>{betProfit}</p>
        <div className={styles.bet} onClick={() => onClick(betProfit)}>
          <p>{label}</p>
          <p>{betAmount}</p>
          {isLock && <LockOverlay />}
        </div>
      </div>
    </>
  );
};

export default BetWithText;
