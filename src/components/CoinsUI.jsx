import React from "react";
import styles from "./css/CoinsUI.module.css";

export const CoinsUI = ({ setResult }) => {
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
          <div
            key={index}
            className={styles.betButton}
            onClick={() =>
              setResult(
                coin[coin.length - 1] === "K" ? parseInt(coin) * 1000 : coin
              )
            }
          >
            {coin}
          </div>
        ))}
      </div>
    </div>
  );
};
