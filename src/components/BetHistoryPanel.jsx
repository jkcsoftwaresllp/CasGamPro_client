import React from "react";
import { UserStake } from "./UserStake";
import styles from "./css/BetHistoryPanel.module.css";

export const BetHistoryPannel = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.bordered} ${styles.mb3}`}>
          <h6>History</h6>
          <button className={styles.button}>A</button>
          <button className={styles.button}>B</button>
          <button className={styles.button}>A</button>
        </div>
        <UserStake />
      </div>
    </>
  );
};
