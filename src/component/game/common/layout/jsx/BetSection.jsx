import React from "react";
import styles from "../style/BetSection.module.css";
import { BetSection as Lucky7BBetSection } from "../../../lucky7B/jsx/BetSection";
import { BetSection as AndarBaharBetSection } from "../../../AndarBahar/jsx/BetSection";

export const BetSection = ({ game, onClick }) => {
  let content;

  switch (game) {
    case "lucky7B":
      content = <Lucky7BBetSection onClick={onClick} />;
      break;
    case "andarBahar":
      content = <AndarBaharBetSection onClick={onClick} />;
      break;

    default:
      content = <div>Game not found</div>;
  }

  return <div className={styles.betSection}>{content}</div>;
};
