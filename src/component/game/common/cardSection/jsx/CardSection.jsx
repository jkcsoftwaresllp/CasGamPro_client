import React from "react";
import styles from "../style/CardSection.module.css";
import { CardToPlayer } from "./CardToPlayer";

export const CardSection = ({
  playerA = "Player A",
  playerB = "Player B",
  cards = [],
}) => {

  const playerACards = cards.filter((_, index) => index % 2 === 0);
  const playerBCards = cards.filter((_, index) => index % 2 !== 0);

  return (
    <div className={styles.cardSection}>
      <CardToPlayer name={playerA} cards={playerACards} />
      <CardToPlayer name={playerB} cards={playerBCards} />
    </div>
  );
};
