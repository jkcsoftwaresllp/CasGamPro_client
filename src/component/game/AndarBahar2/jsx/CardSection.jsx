import React from "react";
import styles from "../style/CardSection.module.css";
import { CardSection as ABCardSection } from "../../common/cardSection/jsx/CardSection";
import { Card } from "../../common/cardSection/jsx/Card";
import { interleaveCards } from "../helper/interleaveCards";

export const CardSection = ({ cards = {} }) => {
  const jokerCard = cards?.jokerCard;
  const cardsToSend = interleaveCards(cards);

  return (
    <div className={styles.cardSection}>
      <div className={styles.jokerCard}>
        {jokerCard && (
          <>
            <p className={styles.jokerText}>Joker Card</p>
            <Card code={jokerCard} onClick={() => {}} isShow />
          </>
        )}
      </div>
      <ABCardSection playerA="Andar" playerB="Bahar" cards={cardsToSend} />
    </div>
  );
};
