import { MenuBar } from "./MenuBar";
import { BetHistoryPannel } from "./BetHistoryPanel";
import styles from "./css/TeenPatti.module.css";
import { PlaySection } from "./PlaySection";

export const TeenPatti = () => {
  return (
    <div>
      <MenuBar />
      <div className={styles.teenPatti}>
        <PlaySection />
        <BetHistoryPannel />
      </div>
    </div>
  );
};
