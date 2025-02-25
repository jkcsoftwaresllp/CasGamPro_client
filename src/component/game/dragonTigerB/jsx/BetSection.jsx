import React from "react";
import styles from "../style/BetSection.module.css";

import { BetOnBottom } from "./BetOnBottom";
import { BetOnTop } from "./BetOnTop";

export const BetSection = ({ onClick, isLock }) => {
  return (
    <div className={styles.betSection}>
      <BetOnTop onClick={onClick} isLock={isLock} />
      <div className={styles.dragonTiger}>
        <BetOnBottom onClick={onClick} isLock={isLock} side={"D"} />
        <BetOnBottom onClick={onClick} isLock={isLock} side={"T"} />
      </div>
    </div>
  );
};
