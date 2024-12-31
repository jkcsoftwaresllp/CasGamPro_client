import React from "react";
import styles from "../style/CardSection.module.css";
import { CardToPlayer } from "./CardToPlayer";

export const CardSection = ({ gameId, roundId }) => {
  const cards = ["D10", "CA", "D5", "HQ", "H4", "H6", "D6", "D8"];

  return (
    <div className={styles.cardSection}>
      <CardToPlayer name={"Player A"} cards={cards} />
      <CardToPlayer name={"Player B"} cards={cards} />
    </div>
  );
};
