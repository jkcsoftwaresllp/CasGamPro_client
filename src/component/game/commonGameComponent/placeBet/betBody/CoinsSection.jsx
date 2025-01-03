import React from "react";
import BetCoins from "./BetCoins";
import styles from "./style/BetBody.module.css";

const CoinSection = ({ onCoinClick }) => {
  const row1 = [100, 200, 250, 500];
  const row2 = [700, 1000, 2000, 5000];

  return (
    <div className={styles.column}>
      <div className={styles.row}>
        {row1.map((value) => (
          <BetCoins key={value} label={value} onClick={onCoinClick} />
        ))}
      </div>
      <div className={styles.row}>
        {row2.map((value) => (
          <BetCoins key={value} label={value} onClick={onCoinClick} />
        ))}
      </div>
    </div>
  );
};

export default CoinSection;
