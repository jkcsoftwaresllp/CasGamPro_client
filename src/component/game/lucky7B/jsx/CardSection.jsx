import React, { useState } from "react";
import styles from "../style/CardSection.module.css";
import { Card } from "../../common/cardSection/jsx/Card";

export const CardSection = ({}) => {
  const [cardCode, setCardCode] = useState("D7");
  
  return (
    <div className={styles.cardSection}>
      <Card code={cardCode} onClick={() => {}} isShow />
    </div>
  );
};
