import React from "react";
import styles from "../styles/BetWithText.module.css";
import { LockOverlay } from "./LockOverlay";
import { clubIcon, diamondIcon, heartIcon, spadeIcon } from "../helper/icons";

export const BetWithColor = ({
  color,
  betProfit,
  betAmount,
  onClick,
  isLock,
}) => {
  // Use the correct icon component based on the color
  const Icon1 = color === "red" ? diamondIcon : clubIcon;
  const Icon2 = color === "red" ? heartIcon : spadeIcon;

  return (
    <div className={styles.betWithText}>
      <p className={styles.betProfit}>{betProfit}</p>
      <div className={styles.bet} onClick={() => onClick(color, betProfit)}>
        <div>
          {Icon2} {Icon1}
        </div>
        <p>{betAmount}</p>
        {isLock && <LockOverlay />}
      </div>
    </div>
  );
};
