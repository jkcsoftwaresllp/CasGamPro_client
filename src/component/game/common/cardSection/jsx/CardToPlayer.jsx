import React from "react";
import styles from "../style/CardSection.module.css";
import { Card } from "./Card";
import { ScrollBox } from "../../layout/jsx/ScrollBox";

// card = ["D10", "CA", "D5", "HQ", "H4", "H6", "D6", "D8"];

export const CardToPlayer = ({ name, cards }) => {
  return (
    <div className={styles.cardToPlayer}>
      <h3 className={styles.playerName}>{name}</h3>
      <div className={styles.cardsContainer}>
        <ScrollBox direction="horizontal">
          {cards.map((cardCode, index) => (
            <div key={index} className={styles.card}>
              <Card code={cardCode} onClick={() => {}} />
            </div>
          ))}
        </ScrollBox>
      </div>
    </div>
  );
};
