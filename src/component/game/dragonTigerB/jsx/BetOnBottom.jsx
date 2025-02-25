import React from "react";
import styles from "../style/BetOnBottom.module.css";

import { BetOnEvOdReBl } from "../../common/BetSection/jsx/BetOnEvOdReBl";
import { BetCardSection } from "../../common/BetSection/jsx/BetCardSection";

export const BetOnBottom = ({ onClick, isLock, side }) => {
  const playerName = side === "T" ? "Tiger" : "Dragon";
  return (
    <div className={styles.betOnBottom}>
      <p className={styles.playerName}>{playerName}</p>
      <div className={styles.lowHighEvenOdd}>
        <BetOnEvOdReBl
          onClick={onClick}
          isLock={isLock}
          betAmount={{ even: "0.0", odd: "0.0", red: "0.0", black: "0.0" }}
          betProfit={{ even: 2.1, odd: 1.79, red: 1.95, black: 1.95 }}
          player={side}
        />
      </div>
      <BetCardSection
        onClick={onClick}
        isLock={isLock}
        betAmount={{ 2: "0.0" }}
        betProfit={12}
        player={side}
      />
    </div>
  );
};
