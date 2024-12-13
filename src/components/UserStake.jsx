import React from "react";
import styles from "./css/UserStake.module.css"; // Import the CSS module

export const UserStake = () => {
  return (
    <div className={styles.container}>
      <h6 className={styles.heading}>Current Stake</h6>
      <p className={styles.details}>
        Details of the current stake will go here.
      </p>
    </div>
  );
};
