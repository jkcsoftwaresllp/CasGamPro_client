import React from "react";
import styles from "../style/BetSection.module.css";

import { BetCardSection } from "../../common/BetSection/jsx/BetCardSection";

export const BetSection = ({ onClick }) => {
  let isLock = false;

  return (
    <div className={styles.betSection}>
      <div className={styles.betCard}>
        <p className={styles.name}>Andar</p>
        <BetCardSection
          onClick={(label, value) => onClick({ player: "Andar", label }, value)}
          isLock={isLock}
          betAmount={{ 2: "200" }}
          betProfit={"1.96"}
        />
      </div>
      <div className={styles.betCard}>
        <p className={styles.name}>Bahar</p>
        <BetCardSection
          onClick={(label, value) => onClick({ player: "Bahar", label }, value)}
          isLock={isLock}
          betAmount={{ 2: "200" }}
          betProfit={"1.96"}
        />
      </div>
    </div>
  );
};
