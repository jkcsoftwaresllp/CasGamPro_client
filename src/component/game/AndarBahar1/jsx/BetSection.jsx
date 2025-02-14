import React from "react";
import styles from "../style/BetSection.module.css";

import { BetCardSection } from "../../common/BetSection/jsx/BetCardSection";

export const BetSection = ({ onClick, isLock }) => {
  return (
    <div className={styles.betSection}>
      <div className={styles.betCard}>
        <p className={styles.name}>Andar</p>
        <BetCardSection
          onClick={onClick}
          isLock={isLock}
          betAmount={{ 2: "200" }}
          betProfit={"1.96"}
          player="A"
        />
      </div>
      <div className={styles.betCard}>
        <p className={styles.name}>Bahar</p>
        <BetCardSection
          onClick={onClick}
          isLock={isLock}
          betAmount={{ 2: "200" }}
          betProfit={"1.96"}
          player="B"
        />
      </div>
    </div>
  );
};
