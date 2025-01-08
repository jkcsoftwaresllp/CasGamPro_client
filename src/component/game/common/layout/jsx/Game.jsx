import React from "react";
import styles from "../style/Game.module.css";
import { BetSection } from "./BetSection";
import { GameHistory } from "./GameHistory";
import { GameInterface } from "./GameInterface";
import { SimulationSection } from "./SimulationSection";
import { StakeSection } from "./StakeSection";

export const Game = () => {
  return (
    <div className={styles.game}>
      <div className={styles.mainContent}>
        <div className={styles.gameControls}>
          <div className={styles.gameInterface}>
            <GameInterface />
          </div>
          <div className={styles.simulationSection}>
            <SimulationSection />
          </div>
        </div>
        <BetSection />
      </div>
      <div className={styles.detailsSection}>
        <GameHistory />
        <StakeSection />
      </div>
    </div>
  );
};
