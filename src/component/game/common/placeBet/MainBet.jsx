import React from "react";
import { BetComponent } from "./betBody/BetComponent";
import { UserLabelHeader } from "./betBody/BetHeader";
import { MainHeader } from "./betHeader/MainHeader";
import styles from "./MainBet.module.css";

export const MainBet = ({ betItems, setBetItems }) => {
  return (
    <div className={styles.mainBet}>
      <MainHeader />
      <UserLabelHeader />
      <BetComponent
        betFor={betItems.label.toUpperCase()}
        profit={0.96}
        stake={0}
        setBetItems={setBetItems}
      />
    </div>
  );
};
