import React from "react";
import styles from "../style/BetSection.module.css";

import { BetOnEvOdReBl } from "../../common/BetSection/jsx/BetOnEvOdReBl";
import { BetCardSection } from "../../common/BetSection/jsx/BetCardSection";
import { BetWithText } from "../../common/BetSection/jsx/BetWithText";
import { BetOnCard } from "../../common/BetSection/jsx/BetOnCard";

export const BetSection = ({ onClick }) => {
  let isLock = false;

  return (
    <div className={styles.betSection}>
      <div className={styles.lowHighEvenOdd}>
        <div className={styles.lowHigh}>
          <BetWithText
            label={"Low"}
            betProfit={"1.96"}
            betAmount={"0.0"}
            isLock={isLock}
            onClick={onClick}
          />

          <BetOnCard
            label={"7"}
            betProfit={"1.96"}
            betAmount={"0.0"}
            isLock={isLock}
            onClick={onClick}
          />

          <BetWithText
            label={"High"}
            betProfit={"1.96"}
            betAmount={"0.0"}
            isLock={isLock}
            onClick={onClick}
          />
        </div>
        <BetOnEvOdReBl
          onClick={onClick}
          isLock={isLock}
          betAmount={{ even: "0.0", odd: "0.0", red: "0.0", black: "0.0" }}
          betProfit={{ even: "1.96", odd: "1.96", red: "1.96", black: "1.96" }}
        />
      </div>
      <BetCardSection
        onClick={onClick}
        isLock={isLock}
        betAmount={{ 2: "200" }}
        betProfit={"1.96"}
      />
    </div>
  );
};
