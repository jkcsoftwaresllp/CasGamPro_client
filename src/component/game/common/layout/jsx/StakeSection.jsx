import React from "react";
import styles from "../style/StakeSection.module.css";
import { MainBet } from "../../placeBet/MainBet";
import { UserBetMain } from "../../userBet/jsx/UserBetMain";

export const StakeSection = ({ betItems, setBetItems, status }) => {
  let canOpen;
  if (status === "betting") canOpen = true;
  // else canOpen = false;
  else canOpen = true;

  return (
    <div className={styles.stakeSection}>
      {betItems && canOpen && (
        <MainBet betItems={betItems} setBetItems={setBetItems} />
      )}
      <UserBetMain />
    </div>
  );
};
