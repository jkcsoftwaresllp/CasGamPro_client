import React from "react";
import styles from "../styles/BetSection.module.css";
import { BetOnCard } from "./BetOnCard";

const cardCodes = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const BetCardSection = ({ gameId, isLock, label }) => {
  return (
    <div className={styles.betSection}>
      <div className={styles.name}>{label}</div>
      <div className={styles.cards}>
        {cardCodes.map((code) => (
          <BetOnCard
            key={code}
            label={code}
            betAmount={"0.0"}
            isLock={isLock}
          />
        ))}
      </div>
    </div>
  );
};
