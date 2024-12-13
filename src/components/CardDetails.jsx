import React from "react";
import styles from "./css/CardDetails.module.css";

export const CardDetails = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.playerLabel}>Player 1</div>
        <div className={styles.cardsContainer} id="player1-cards">
          <div className={styles.card}>
            <img src="placeholder.png" alt="Card" />
          </div>
          <div className={styles.card}>
            <img src="placeholder.png" alt="Card" />
          </div>
          <div className={styles.card}>
            <img src="placeholder.png" alt="Card" />
          </div>
        </div>
        <div className={`${styles.playerLabel} ${styles.mt3}`}>Player 2</div>
        <div
          className={`${styles.cardsContainer} ${styles.mt2}`}
          id="player2-cards"
        >
          <div className={styles.card}>
            <img src="placeholder.png" alt="Card" />
          </div>
          <div className={styles.card}>
            <img src="placeholder.png" alt="Card" />
          </div>
          <div className={styles.card}>
            <img src="placeholder.png" alt="Card" />
          </div>
        </div>
      </div>
    </>
  );
};
