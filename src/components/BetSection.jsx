import { CustomBetInput } from "./CustomBetInput";
import { CoinsUI } from "./CoinsUI";
import { PlayerButton } from "./PlayerButton";
import styles from "./css/TeenPatti.module.css";

export const BetSection = () => {
  return (
    <div className={styles.betSection}>
      <CustomBetInput />
      <CoinsUI />
      <PlayerButton />
    </div>
  );
};
