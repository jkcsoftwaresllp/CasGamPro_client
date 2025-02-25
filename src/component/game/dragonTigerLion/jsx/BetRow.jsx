import React from "react";
import styles from "../style/BetSection.module.css";
import { BetProfit } from "../../common/BetSection/jsx/BetProfit";

export const BetRow = ({
  onClick,
  isLock,
  label = "",
  player = {},
  profit = {},
}) => {
  return (
    <div className={styles.betRow}>
      <div className={`${styles.label} ${styles.box}`}>{label}</div>
      <div className={styles.box}>
        <BetProfit
          betProfit={profit.d}
          isLock={isLock}
          onClick={(value) => {
            onClick({ player: player.d, label: "D" }, value);
          }}
        />
      </div>
      <div className={styles.box}>
        <BetProfit
          betProfit={profit.t}
          isLock={isLock}
          onClick={(value) => {
            onClick({ player: player.t, label: "T" }, value);
          }}
        />
      </div>

      <div className={styles.box}>
        <BetProfit
          betProfit={profit.l}
          isLock={isLock}
          onClick={(value) => {
            onClick({ player: player.l, label: "L" }, value);
          }}
        />
      </div>
    </div>
  );
};
