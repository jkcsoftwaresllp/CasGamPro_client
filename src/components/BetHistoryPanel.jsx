import React from "react";
import { UserStake } from "./UserStake";
import styles from "./css/BetHistoryPanel.module.css";

export const BetHistoryPannel = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.bordered} ${styles.mb3}`}>
          <h6>History</h6>
          <button className={styles.button}>P1</button>
          <button className={styles.button}>P2</button>
          <button className={styles.button}>P1</button>
        </div>
        <UserStake />
      </div>
    </>
  );
};
