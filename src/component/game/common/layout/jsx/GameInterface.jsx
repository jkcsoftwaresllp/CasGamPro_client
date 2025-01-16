import React from "react";
import styles from "../style/GameInterface.module.css";
import { CardSection as Lucky7BCardSection } from "../../../lucky7B/jsx/CardSection";
import { CardSection as AndarBaharCardSection } from "../../../AndarBahar2/jsx/CardSection";
import { CardSection as TeenPattiT20CardSection } from "../../../teenPattiT20/jsx/CardSection";

export const GameInterface = ({ game, roundId = "A85745846" }) => {
  const betSectionMap = {
    lucky7B: Lucky7BCardSection,
    andarBahar: AndarBaharCardSection,
    teenPattiT20: TeenPattiT20CardSection,
  };

  const gameNameMap = {
    lucky7B: "Lucky 7B",
    andarBahar1: "Andar Bahar 1",
    andarBahar2: "Andar Bahar 2",
    teenPattiT20: "Teen Patti T20",
  };

  const SelectedBetSection = betSectionMap[game] || null;
  const gameName = gameNameMap[game] || null;

  return (
    <div className={styles.gameInterface}>
      <div className={styles.header}>
        <div className={styles.gameDetail}>{gameName ? gameName : "Error"}</div>
        <div className={styles.gameRoundId}>{roundId}</div>
      </div>
      <div className={styles.content}>
        {SelectedBetSection ? (
          <SelectedBetSection />
        ) : (
          <div>Game not found</div>
        )}
      </div>
    </div>
  );
};
