import React from "react";

import styles from "./style/BetBody.module.css";

export const BetStatus = ({
  betFor,
  stakeValue,
  currentProfit,
  onProfitChange,
}) => {
  return (
    <div className={styles.inline}>
      <div className={styles.betFor}>{betFor}</div>
      <div className={styles.currentProfit}>{currentProfit}</div>

      <input
        type="number"
        value={stakeValue}
        readOnly
        className={styles.input}
      />
      <span className={styles.profit}>
        {(stakeValue * currentProfit).toFixed(2)}
      </span>
    </div>
  );
};
