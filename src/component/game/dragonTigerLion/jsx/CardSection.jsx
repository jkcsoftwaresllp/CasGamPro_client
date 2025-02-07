import React from "react";
import styles from "../style/CardSection.module.css";
import { Card } from "../../common/cardSection/jsx/Card";
import { interleaveCards } from "../helper/interleaveCards";

export const CardSection = ({ cards = {} }) => {
  const cardsToSend = interleaveCards(cards);

  return (
    <div className={styles.cardSection}>
      {cardsToSend[0] && (
        <Card code={cardsToSend[0]} onClick={() => {}} isShow />
      )}
      {cardsToSend[1] && (
        <Card code={cardsToSend[1]} onClick={() => {}} isShow />
      )}
      {cardsToSend[2] && (
        <Card code={cardsToSend[2]} onClick={() => {}} isShow />
      )}
    </div>
  );
};
