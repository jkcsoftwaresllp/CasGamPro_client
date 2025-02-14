import React from "react";
import styles from "../styles/BetSection.module.css";
import { BetOnCard } from "./BetOnCard";
import { cardCodes } from "../helper/BetCardSection";
import { PLAYER_SIDES } from "../../../../../utils/gamePlayerSides";

export const BetCardSection = ({
  onClick,
  isLock,
  betProfit = null,
  betAmount = {},
}) => {
  let profit = betProfit;
  if (profit === null) {
    profit = "1.96";
  }

  return (
    <div className={styles.betSection}>
      <div className={styles.name}>{profit}</div>
      <div className={styles.cards}>
        {cardCodes.map((code) => (
          <BetOnCard
            key={code}
            label={code}
            betAmount={betAmount[code] || "0.0"}
            betProfit={profit}
            isLock={isLock}
            onClick={(label, value) => onClick({ label, player: "A" }, value)}
          />
        ))}
      </div>
    </div>
  );
};
