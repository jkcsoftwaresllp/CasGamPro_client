import React from "react";
import { BetOnSuite } from "./BetOnSuite";
import { CardBetSection } from "./CardBetSection";
import style from "../style/LowerBetSection.module.css";

export const LowerBetSection = () => {
  return (
    <div className={style.lowerBetSection}>
      <BetOnSuite />
      <CardBetSection />
    </div>
  );
};
