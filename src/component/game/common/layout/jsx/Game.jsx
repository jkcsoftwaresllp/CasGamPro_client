import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../style/Game.module.css";
import { BetSection } from "./BetSection";
import { GameHistory } from "./GameHistory";
import { GameInterface } from "./GameInterface";
import { SimulationSection } from "./SimulationSection";
import { StakeSection } from "./StakeSection";

export const Game = () => {
  const [betItems, setBetItems] = useState(null);
  const [game, setGame] = useState("");
  const [roundId, setRoundId] = useState("");

  const location = useLocation();

  // Extract gameId and roundId from the query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // Get query parameters from URL
    const gameId = queryParams.get("gameId");
    const roundId = queryParams.get("roundId");

    if (gameId) {
      setGame(gameId);
    }
    if (roundId) {
      setRoundId(roundId);
    }
  }, [location.search]); // Re-run whenever the search query changes

  return (
    <div className={styles.game}>
      <div className={styles.mainContent}>
        <div className={styles.gameControls}>
          <div className={styles.gameInterface}>
            <GameInterface game={game} roundId={roundId} />
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
