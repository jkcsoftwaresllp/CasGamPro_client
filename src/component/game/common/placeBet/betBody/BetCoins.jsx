import React from "react";
import styles from "./style/BetBody.module.css";

export const BetCoins = ({ label, onClick }) => {
  return (
    <button className={styles.betCoins} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};
