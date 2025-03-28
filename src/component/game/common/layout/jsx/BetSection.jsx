import React from "react";
import styles from "../style/BetSection.module.css";
import { BetSection as Lucky7ABetSection } from "../../../lucky7A/jsx/BetSection";
import { BetSection as Lucky7BBetSection } from "../../../lucky7B/jsx/BetSection";
import { BetSection as AndarBahar2BetSection } from "../../../AndarBahar2/jsx/BetSection";
import { BetSection as AndarBahar1BetSection } from "../../../AndarBahar1/jsx/BetSection";
import { BetSection as TeenPattiT20BetSection } from "../../../teenPattiT20/jsx/BetSection";
import { BetSection as DragonTigerBetSection } from "../../../dragonTiger/jsx/BetSection";
import { BetSection as DragonTigerBBetSection } from "../../../dragonTigerB/jsx/BetSection";
import { BetSection as DragonTigerLionBetSection } from "../../../dragonTigerLion/jsx/BetSection";

export const BetSection = ({ game, onClick, status }) => {
  const betSectionMap = {
    L7A: Lucky7ABetSection,
    L7B: Lucky7BBetSection,
    AB2: AndarBahar2BetSection,
    AB1: AndarBahar1BetSection,
    TP1: TeenPattiT20BetSection,
    DT20: DragonTigerBetSection,
    DT20TWO: DragonTigerBBetSection,
    DTL20: DragonTigerLionBetSection,
  };

  let isLock;
  if (status === "betting") isLock = false;
  else isLock = true;

  const SelectedBetSection = betSectionMap[game] || null;

  return (
    <div className={styles.betSection}>
      {SelectedBetSection ? (
        <SelectedBetSection onClick={onClick} isLock={isLock} />
      ) : (
        <div>Game not found</div>
      )}
    </div>
  );
};
