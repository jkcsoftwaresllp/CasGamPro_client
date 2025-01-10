import React from "react";
import styles from "../style/CardSection.module.css";
import { CardSection as ABCardSection } from "../../common/cardSection/jsx/CardSection";

export const CardSection = ({}) => {
  const cards = ["D10", "CA", "D5", "HQ", "H4", "H6", "D6", "D8"];

  return (
    <div className={styles.cardSection}>
      <ABCardSection playerA="Andar" playerB="Bahar" cards={cards} />
    </div>
  );
};
