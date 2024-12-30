import React from "react";
import styles from "../styles/BetPlacing.module.css";

export const PlayerLabel = ({ label, betPlaced }) => {
  return (
    <>
      <div className={styles.playerLabel}>
        <p>{label}</p> 
        <p>{betPlaced}</p>
      </div>
    </>
  );
};
