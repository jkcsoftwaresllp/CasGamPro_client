import React, { useState } from "react";
import styles from "../style/CardSection.module.css";
import { Card } from "../../common/cardSection/jsx/Card";

export const CardSection = ({ cards = [] }) => {
  if (!cards.length) return null;



  return (
    <div className={styles.cardSection}>
      <Card code={cards[2]} onClick={() => {}} isShow />
    </div>
  );
};
