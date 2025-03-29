import React, { useState } from "react";
import styles from "./style/BetBody.module.css";

export const BetStatus = ({
  betFor,
  stakeValue,
  currentProfit,
  setStakeValue,
  player,
}) => {
  const handleStakeChange = (event) => {
    const newStakeValue = parseFloat(event.target.value);
    setStakeValue(newStakeValue);
  };

  return (
    <div className={styles.inline}>
      <div className={styles.betFor}>{player?.toUpperCase()}</div>
      <div className={styles.currentProfit}>{currentProfit}</div>

      <input
        type="number"
        value={stakeValue}
        className={styles.input}
        onChange={handleStakeChange}
      />
      <span className={styles.profit}>
        {(stakeValue * currentProfit).toFixed(2)}
      </span>
    </div>
  );
};
