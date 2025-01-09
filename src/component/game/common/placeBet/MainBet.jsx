import React from "react";
import { BetComponent } from "./betBody/BetComponent";
import { UserLabelHeader } from "./betBody/BetHeader";
import { MainHeader } from "./betHeader/MainHeader";
import styles from './MainBet.module.css';  

export const MainBet = () => {
  return (
    <div
     
      className={styles.mainBet}
    >
      <MainHeader />
      <UserLabelHeader />
      <BetComponent betFor="Andar" profit={0.96} stake={0} />
    </div>
  );
};
