import React, { useState } from "react";
import styles from "../style/Game.module.css";
import { BetSection } from "./BetSection";
import { GameHistory } from "./GameHistory";
import { GameInterface } from "./GameInterface";
import { SimulationSection } from "./SimulationSection";
import { StakeSection } from "./StakeSection";

export const Game = () => {
  const [betItems, setBetItems] = useState(null);
  const game = "lucky7B";

  return (
    <div className={styles.game}>
      <div className={styles.mainContent}>
        <div className={styles.gameControls}>
          <div className={styles.gameInterface}>
            <GameInterface game={game} />
          </div>
          <div className={styles.simulationSection}>
            <SimulationSection />
          </div>
        </div>
        <BetSection
          game={game}
          onClick={(label, value) => {
            setBetItems({ label, value }); // {label: "Low", value: "0.0"}
          }}
        />
      </div>
      <div className={styles.detailsSection}>
        <GameHistory />
        <StakeSection betItems={betItems} setBetItems={setBetItems} />
      </div>
    </div>
  );
};
