import React from "react";
import styles from "../style/GameInterface.module.css";
import { CardSection as Lucky7BCardSection } from "../../../lucky7B/jsx/CardSection";

export const GameInterface = ({ game }) => {
  let content;

  switch (game) {
    case "lucky7B":
      content = <Lucky7BCardSection />;
      break;

    default:
      content = <div>Game not found</div>;
  }

  return <div className={styles.gameInterface}>{content}</div>;
};
