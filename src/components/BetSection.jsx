import { useState } from "react";
import { CustomBetInput } from "./CustomBetInput";
import { CoinsUI } from "./CoinsUI";
import { PlayerButton } from "./PlayerButton";
import styles from "./css/TeenPatti.module.css";

export const BetSection = (gameId) => {
  const [betValue, setBetValue] = useState(0);

  return (
    <div className={styles.betSection}>
      <div className={styles.betPlacing}>
        <CustomBetInput setResult={setBetValue} betValue={betValue} />
        <div className={styles.winningAmount}>
          Winning Amount: 
          <span className={styles.amount}> {betValue * 1.96}</span>
        </div>
      </div>
      <CoinsUI setResult={setBetValue} />
      <PlayerButton betAmount={betValue} />
    </div>
  );
};
