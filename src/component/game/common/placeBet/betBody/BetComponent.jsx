// BetComponent.jsx
import React, { useState } from "react";
import { CoinSection } from "./CoinsSection";
import { BetStatus } from "./BetStatus";
import { CustomButton } from "./CustomButton";
import { handleSubmit } from "./helper/betHelper";
import styles from "./style/BetBody.module.css";
import { useQueryParams } from "../../layout/helper/useQueryParams";

export const BetComponent = ({ betFor, profit, setBetItems, player }) => {
  const [stakeValue, setStakeValue] = useState(50);
  const [currentProfit, setCurrentProfit] = useState(profit || 0);
  const { gameType, roundId } = useQueryParams();

  const onStakeChange = (value) => setStakeValue((prev) => prev + value);
  const onReset = () => {
    setStakeValue(0);
    setCurrentProfit(profit || 0);
  };

  const onSubmit = () =>
    handleSubmit({
      stakeValue,
      currentProfit,
      player,
      gameType,
      roundId,
      setBetItems,
    });

  return (
    <div className={styles.component}>
      <BetStatus
        betFor={betFor}
        stakeValue={stakeValue}
        currentProfit={currentProfit}
        setStakeValue={setStakeValue}
        player={player}
      />
      <CoinSection onCoinClick={onStakeChange} />
      <div className={styles.buttonContainer}>
        <CustomButton
          label="Reset"
          onClick={onReset}
          backgroundColor="Red"
          textColor="White"
        />
        <CustomButton
          label="Submit"
          onClick={onSubmit}
          backgroundColor="Green"
          textColor="White"
        />
      </div>
    </div>
  );
};
