import React from "react";
import styles from "../style/BetSection.module.css";

import { BetCardSection } from "../../common/BetSection/jsx/BetCardSection";


export const BetSection = ({ onClick }) => {
  let isLock = false;

  return (
    <div className={styles.betSection}>
      <BetCardSection
        onClick={onClick}
        isLock={isLock}
        betAmount={{ 2: "200" }}
        betProfit={"1.96"}
      />

      <BetCardSection
        onClick={onClick}
        isLock={isLock}
        betAmount={{ 2: "200" }}
        betProfit={"1.96"}
      />
    </div>
  );
};
