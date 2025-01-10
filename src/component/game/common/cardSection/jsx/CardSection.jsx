import React from "react";
import styles from "../style/CardSection.module.css";
import { CardToPlayer } from "./CardToPlayer";

export const CardSection = ({
  playerA = "Player A",
  playerB = "Player B",
  cards = [],
}) => {
  return (
    <div className={styles.cardSection}>
      <CardToPlayer name={playerA} cards={cards} />
      <CardToPlayer name={playerB} cards={cards} />
    </div>
  );
};
