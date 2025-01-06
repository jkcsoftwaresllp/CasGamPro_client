import React from "react";
import { BetOnCard } from "../../../common/BetSection/jsx/BetOnCard";
import style from "../style/LowerBetSection.module.css";

export const CardBetSection = () => {
  const firstRowCards = ["A", "2", "3", "4", "5", "6", "7", "8", "9"];
  const secondRowCards = ["10", "J", "Q", "K"];

  return (
    <div className={style.betOnCard}>
      {/* First Row */}
      <div className={style.row}>
        {firstRowCards.map((card, index) => (
          <BetOnCard
            key={`firstRow-${index}`}
            label={card}
            betProfit={0}
            betAmount={0}
            onClick={() => {}}
            isLock={false}
          />
        ))}
      </div>

      {/* Second Row */}
      <div className={style.row}>
        {secondRowCards.map((card, index) => (
          <BetOnCard
            key={`secondRow-${index}`}
            label={card}
            betProfit={0}
            betAmount={0}
            onClick={() => {}}
            isLock={false}
          />
        ))}
      </div>
    </div>
  );
};
