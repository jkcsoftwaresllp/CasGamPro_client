import React from "react";
import styles from "../styles/BetOnCard.module.css";
import { LockOverlay } from "./LockOverlay";
import { clubIcon, diamondIcon, heartIcon, spadeIcon } from "../helper/icons";

export const BetOnCard = ({ label, betProfit, betAmount, onClick, isLock }) => {
  return (
    <>
      <div
        className={styles.betOnCard}
        onClick={() => onClick(label, betProfit)}
      >
        <div className={`${styles.card} ${styles.label}`}>{label}</div>

        <div className={styles.card}>
          {spadeIcon} {diamondIcon}
        </div>
        <div className={styles.card}>
          {clubIcon} {heartIcon}
        </div>
        <p className={`${styles.card} ${styles.betAmount}`}>{betAmount}</p>
        {isLock && <LockOverlay />}
      </div>
    </>
  );
};
