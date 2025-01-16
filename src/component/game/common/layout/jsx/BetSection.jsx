import React from "react";
import styles from "../style/BetSection.module.css";
import { BetSection as Lucky7BBetSection } from "../../../lucky7B/jsx/BetSection";
import { BetSection as AndarBaharBetSection } from "../../../AndarBahar/jsx/BetSection";
import { BetSection as TeenPattiT20BetSection } from "../../../teenPattiT20/jsx/BetSection";

export const BetSection = ({ game, onClick }) => {
  const betSectionMap = {
    lucky7B: Lucky7BBetSection,
    andarBahar: AndarBaharBetSection,
    teenPattiT20: TeenPattiT20BetSection,
  };

  const SelectedBetSection = betSectionMap[game] || null;

  return (
    <div className={styles.betSection}>
      {SelectedBetSection ? (
        <SelectedBetSection onClick={onClick} />
      ) : (
        <div>Game not found</div>
      )}
    </div>
  );
};
