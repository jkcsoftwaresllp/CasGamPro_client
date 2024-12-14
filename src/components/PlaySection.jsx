import { useState } from "react";
import { BetSection } from "./BetSection";
import { SimulationSection } from "./SimulationSection";
import styles from "./css/TeenPatti.module.css";

export const PlaySection = () => {
  const [isAcceptingBets, setIsAcceptingBets] = useState(true);
  return (
    <div className={styles.playSection}>
      <SimulationSection isAcceptingBets={setIsAcceptingBets} />
      {isAcceptingBets && <BetSection />}
    </div>
  );
};
