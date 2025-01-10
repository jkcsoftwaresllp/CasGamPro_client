import React, { useState } from "react";
import { CoinSection } from "./CoinsSection";
import { BetStatus } from "./BetStatus";
import { CustomButton } from "./CustomButton";
import {
  handleStakeChange,
  handleReset,
  handleSubmit,
} from "./helper/betHelper";
import styles from "./style/BetBody.module.css";

export const BetComponent = ({ betFor, profit, stake, setBetItems }) => {
  const [stakeValue, setStakeValue] = useState(stake);
  const [currentProfit, setCurrentProfit] = useState(profit);

  const stakeChangeHandler = handleStakeChange(setStakeValue);
  const resetHandler = handleReset(
    setStakeValue,
    setCurrentProfit,
    stake,
    profit
  );
  const submitHandler = handleSubmit(stakeValue, currentProfit, setBetItems);

  return (
    <div className={styles.component}>
      <BetStatus
        betFor={betFor}
        stakeValue={stakeValue}
        currentProfit={currentProfit}
        setStakeValue={setStakeValue}
      />
      <CoinSection onCoinClick={stakeChangeHandler} />
      <div className={styles.buttonContainer}>
        <CustomButton
          label="Reset"
          onClick={resetHandler}
          backgroundColor="Red"
          textColor="White"
        />
        <CustomButton
          label="Submit"
          onClick={submitHandler}
          backgroundColor="Green"
          textColor="white"
        />
      </div>
    </div>
  );
};
