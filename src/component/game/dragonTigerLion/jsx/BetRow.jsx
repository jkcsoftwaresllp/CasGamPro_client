import React from "react";
import styles from "../style/BetSection.module.css";
import { BetProfit } from "../../common/BetSection/jsx/BetProfit";

export const BetRow = ({ onClick, isLock, label = "" }) => {
  const sendLabel = label;
  return (
    <div className={styles.betRow}>
      <div className={`${styles.label} ${styles.box}`}>{label}</div>
      <div className={styles.box}>
        <BetProfit
          betProfit={1.96}
          isLock={isLock}
          onClick={(value) => {
            onClick({ player: sendLabel, label: "D" }, value);
          }}
        />
      </div>
      <div className={styles.box}>
        <BetProfit
          betProfit={2}
          isLock={isLock}
          onClick={(value) => {
            onClick({ player: sendLabel, label: "T" }, value);
          }}
        />
      </div>

      <div className={styles.box}>
        <BetProfit
          betProfit={1.96}
          isLock={isLock}
          onClick={(value) => {
            onClick({ player: sendLabel, label: "L" }, value);
          }}
        />
      </div>
    </div>
  );
};
