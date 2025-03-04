import React from "react";
import styles from "../style/StakeSection.module.css";
import { MainBet } from "../../placeBet/MainBet";
import { UserBetMain } from "../../userBet/jsx/UserBetMain";

export const StakeSection = ({ betItems, setBetItems, status }) => {
  let canOpen = status === "betting";

  return (
    <div className={`${styles.stakeSection} ${styles.floating}`}>
      {betItems && canOpen && (
        <MainBet betItems={betItems} setBetItems={setBetItems} />
      )}
      <UserBetMain />
    </div>
  );
};
