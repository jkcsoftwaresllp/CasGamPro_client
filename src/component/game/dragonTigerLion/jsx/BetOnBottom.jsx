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
          onClick={(label, value) => {
            onClick({ label: label.label, player: side }, value);
          }}
          isLock={isLock}
          betAmount={{ even: "0.0", odd: "0.0", red: "0.0", black: "0.0" }}
          betProfit={{ even: "1.96", odd: "1.96", red: "1.96", black: "1.96" }}
        />
      </div>
      <BetCardSection
        onClick={(label, value) => {
          onClick({ label: label.label, player: side }, value);
        }}
        isLock={isLock}
        betAmount={{ 2: "200" }}
        betProfit={"1.96"}
      />
    </div>
  );
};
