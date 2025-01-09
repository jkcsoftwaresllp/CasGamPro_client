import React from "react";
import styles from "../style/BetSection.module.css";

import { BetSection as Lucky7BBetSection } from "../../../lucky7B/jsx/BetSection";

export const BetSection = ({ game }) => {
  let content;

  switch (game) {
    case "lucky7B":
      content = <Lucky7BBetSection />;
      break;

    default:
      content = <div>Game not found</div>;
  }

  return <div className={styles.betSection}>{content}</div>;
};
