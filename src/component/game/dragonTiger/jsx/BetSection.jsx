import React from "react";
import styles from "../style/BetSection.module.css";

import { BetOnBottom } from "./BetOnBottom";

export const BetSection = ({ onClick, isLock }) => {
  return (
    <div className={styles.betSection}>
      <div className={styles.dragonTiger}>
        <BetOnBottom onClick={onClick} isLock={isLock} side={"D"} />
        <BetOnBottom onClick={onClick} isLock={isLock} side={"T"} />
      </div>
    </div>
  );
};
