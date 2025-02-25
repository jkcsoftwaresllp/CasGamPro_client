import React from "react";
import styles from "../style/CardSection.module.css";
import { Card } from "../../common/cardSection/jsx/Card";
import { interleaveCards } from "../helper/interleaveCards";

export const CardSection = ({ cards = {} }) => {
  const cardsToSend = interleaveCards(cards);

  return (
    <div className={styles.cardSection}>
      {cardsToSend && <Card code={cardsToSend} onClick={() => {}} isShow />}
    </div>
  );
};
