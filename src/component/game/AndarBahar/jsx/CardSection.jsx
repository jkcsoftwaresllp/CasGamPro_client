import React, { useState } from "react";
import styles from "../style/CardSection.module.css";
import { CardSection as ABCardSection } from "../../common/cardSection/jsx/CardSection";

export const CardSection = ({}) => {
  const [cardCode, setCardCode] = useState("D7");

  return (
    <div className={styles.cardSection}>
      <ABCardSection />
    </div>
  );
};
