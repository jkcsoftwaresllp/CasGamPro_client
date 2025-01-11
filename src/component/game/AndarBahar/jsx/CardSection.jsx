import React from "react";
import styles from "../style/CardSection.module.css";
import { CardSection as ABCardSection } from "../../common/cardSection/jsx/CardSection";
import { Card } from "../../common/cardSection/jsx/Card";

export const CardSection = ({ cards = [] }) => {
  if (!cards.length) return null;

  const [jokerCard, blindCard] = cards;
  const servingCards = cards.slice(2);


  return (
    <div className={styles.cardSection}>
      <div className={styles.jokerCard}>
        <p className={styles.jokerText}>Joker Card</p>
        <Card code={jokerCard} onClick={() => {}} isShow />
      </div>
      <ABCardSection playerA="Andar" playerB="Bahar" cards={servingCards} />
    </div>
  );
};
