import React from "react";
import styles from "../style/GameInterface.module.css";
import { CardSection as Lucky7BCardSection } from "../../../lucky7B/jsx/CardSection";
import { CardSection as AndarBaharCardSection } from "../../../AndarBahar2/jsx/CardSection";
import { CardSection as TeenPattiT20CardSection } from "../../../teenPattiT20/jsx/CardSection";
import { CardSection as DragonTigerCardSection } from "../../../dragonTiger/jsx/CardSection";
import { gameNameMap } from "../../../helper/gameTypes";

export const GameInterface = ({
  game,
  roundId = "A85745846",
  cards,
  status,
}) => {
  const betSectionMap = {
    lucky7B: Lucky7BCardSection,
    andarBahar1: AndarBaharCardSection,
    andarBahar2: AndarBaharCardSection,
    teenPattiT20: TeenPattiT20CardSection,
    dragonTiger: DragonTigerCardSection,
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
        {status !== "betting" && SelectedBetSection ? (
          <SelectedBetSection cards={cards} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
