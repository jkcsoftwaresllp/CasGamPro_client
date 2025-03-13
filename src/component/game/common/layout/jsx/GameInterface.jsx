import React from "react";
import styles from "../style/GameInterface.module.css";
import { CardSection as Lucky7ACardSection } from "../../../lucky7A/jsx/CardSection";
import { CardSection as Lucky7BCardSection } from "../../../lucky7B/jsx/CardSection";
import { CardSection as AndarBaharCardSection } from "../../../AndarBahar2/jsx/CardSection";
import { CardSection as TeenPattiT20CardSection } from "../../../teenPattiT20/jsx/CardSection";
import { CardSection as DragonTigerCardSection } from "../../../dragonTiger/jsx/CardSection";
import { CardSection as DragonTigerBCardSection } from "../../../dragonTigerB/jsx/CardSection";
import { CardSection as DragonTigerLionCardSection } from "../../../dragonTigerLion/jsx/CardSection";
import { gameNameMap } from "../../../helper/gameTypes";

export const GameInterface = ({
  game,
  roundId = "A85745846",
  cards,
  status,
}) => {
  const betSectionMap = {
    L7A: Lucky7ACardSection,
    L7B: Lucky7BCardSection,
    AB1: AndarBaharCardSection,
    AB2: AndarBaharCardSection,
    TP1: TeenPattiT20CardSection,
    DT20: DragonTigerCardSection,
    DT20TWO: DragonTigerBCardSection,
    DTL20: DragonTigerLionCardSection,
  };

  const SelectedBetSection = betSectionMap[game] || null;
  const gameName = gameNameMap[game] || "Error";

  return (
    <div className={styles.gameInterface}>
      <div className={styles.header}>
        <div className={styles.gameDetail}>{gameName}</div>
        <div className={styles.gameRoundId}>{roundId}</div>
      </div>
      <div className={styles.contentWrapper}>
        {/* Show toggle button only for small & medium screens */}

        {/* Casino Cards Section with Smooth Fade Animation */}
        {(game === "AB2" || status !== "betting") && SelectedBetSection ? (
          <SelectedBetSection cards={cards} />
        ) : null}
      </div>
    </div>
  );
};
