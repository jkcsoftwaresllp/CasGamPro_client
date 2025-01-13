import React from "react";
import styles from "../style/CardSection.module.css";
import { CardSection as ABCardSection } from "../../common/cardSection/jsx/CardSection";
import { interleaveCards } from "../helper/interleaveCards";

export const CardSection = ({ cards = {} }) => {
  const cardsToSend = interleaveCards(cards);

  return (
    <div className={styles.cardSection}>
      <ABCardSection
        playerA="Player A"
        playerB="Player B"
        cards={cardsToSend}
      />
    </div>
  );
};

/*
cards = {
  jokerCard: "S3",
  blindCard: null,
  playerA: ["S5", "H7"],
  playerB: ["D8"],
  playerC: [],
};

*/
