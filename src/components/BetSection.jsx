import { useState } from "react";
import { CustomBetInput } from "./CustomBetInput";
import { CoinsUI } from "./CoinsUI";
import { PlayerButton } from "./PlayerButton";
import styles from "./css/TeenPatti.module.css";

export const BetSection = (gameId) => {
  const [betValue, setBetValue] = useState(0);

  return (
    <div className={styles.betSection}>
      <CustomBetInput setResult={setBetValue} betValue={betValue} />
      <CoinsUI setResult={setBetValue} />
      <PlayerButton betAmount={betValue} />
    </div>
  );
};
