import React from "react";
import styles from "../style/StakeSection.module.css";
import { MainBet } from "../../placeBet/MainBet";
import { UserBetMain } from "../../userBet/jsx/UserBetMain";
import { useAuth } from "../../../../../context/jsx/AuthContext";
import { blockLevels } from "../../../../../utils/blockLevers";

export const StakeSection = ({ betItems, setBetItems, status }) => {
  let canOpen;
  if (status === "betting") canOpen = true;
  else canOpen = false;
  const {
    user: { blockingLevel },
  } = useAuth();

  return (
    <div className={styles.stakeSection}>
      {blockingLevel === blockLevels[2] ? (
        <div className={styles.stakeBlocked}>
          You cannot Places Bets. Please contact your Agent.
        </div>
      ) : (
        betItems &&
        canOpen && <MainBet betItems={betItems} setBetItems={setBetItems} />
      )}
      <UserBetMain />
    </div>
  );
};
