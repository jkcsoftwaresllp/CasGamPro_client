import React from "react";
import BetHeader from "./BetHeader";
import LowerBetSection from "./LowerBetSection";
import style from "../style/MainSection.module.css";

const MainBetSection = () => {
  return (
    <div className={style.mainSection}>
      <BetHeader />
      <div className={style.lowerBetRow}>
        <LowerBetSection />
        <div className={style.separator}></div>

        <LowerBetSection />
      </div>
    </div>
  );
};

export default MainBetSection;
