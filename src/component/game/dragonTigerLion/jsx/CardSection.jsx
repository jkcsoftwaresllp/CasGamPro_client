import React from "react";
import styles from "../style/CardSection.module.css";
import { Card } from "../../common/cardSection/jsx/Card";
import { interleaveCards } from "../helper/interleaveCards";

export const CardSection = ({ cards = {} }) => {
  const cardsToSend = interleaveCards(cards);

  const CardWithLabel = ({ label, card }) => {
    return (
      <div className={styles.cardWithLabel}>
        <Card code={card} onClick={() => {}} isShow />
        <p>{label}</p>
      </div>
    );
  };

  return (
    <div className={styles.cardSection}>
      {cardsToSend[0] && (
        <CardWithLabel card={cardsToSend[0]} label={"Dragon"} />
      )}
      {cardsToSend[1] && (
        <CardWithLabel card={cardsToSend[1]} label={"Tiger"} />
      )}
      {cardsToSend[2] && <CardWithLabel card={cardsToSend[2]} label={"Lion"} />}
    </div>
  );
};
