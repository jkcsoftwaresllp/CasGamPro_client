import React from "react";
import styles from "../style/GameInterface.module.css";
import { CardSection as Lucky7BCardSection } from "../../../lucky7B/jsx/CardSection";
import { CardSection as AndarBaharCardSection } from "../../../AndarBahar/jsx/CardSection";

export const GameInterface = ({ game }) => {
  let content;

  switch (game) {
    case "lucky7B":
      content = <Lucky7BCardSection />;

    case "AndarBahar":
      content = <AndarBaharCardSection />;
      break;

    default:
      content = <div>Game not found</div>;
  }

  return <div className={styles.gameInterface}>{content}</div>;
};
