import React from "react";
import styles from "../style/BetSection.module.css";

export const BetHeading = () => {
  return (
    <div className={styles.betRow}>
      <div className={`${styles.label} ${styles.box}`}>{}</div>
      <div className={`${styles.label} ${styles.box}`}>{"Dragon"}</div>
      <div className={`${styles.label} ${styles.box}`}>{"Tiger"}</div>
      <div className={`${styles.label} ${styles.box}`}>{"Lion"}</div>
    </div>
  );
};
