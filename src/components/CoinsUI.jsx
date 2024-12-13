import React from "react";
import styles from "./css/CoinsUI.module.css";

export const CoinsUI = () => {
  const coins = [
    "10",
    "20",
    "50",
    "100",
    "500",
    "1K",
    "5K",
    "10K",
    "100K",
    "500K",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.betButtons}>
        {coins.map((coin, index) => (
          <a key={index} href="https://#" className={styles.betButton}>
            {coin}
          </a>
        ))}
      </div>
    </div>
  );
};
