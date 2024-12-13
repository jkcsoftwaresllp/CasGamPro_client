import { BetSection } from "./BetSection";
import { SimulationSection } from "./SimulationSection";
import styles from "./css/TeenPatti.module.css";

export const PlaySection = () => {
  return (
    <div className={styles.playSection}>
      <SimulationSection />
      <BetSection/>
    </div>
  );
};
