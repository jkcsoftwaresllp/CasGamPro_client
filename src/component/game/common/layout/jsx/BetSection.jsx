import React from "react";
import styles from "../style/BetSection.module.css";
import { BetOnEvOdReBl } from "../../BetSection/jsx/BetOnEvOdReBl";

export const BetSection = () => {
  return (
    <div className={styles.betSection}>
      <BetOnEvOdReBl />
    </div>
  );
};
