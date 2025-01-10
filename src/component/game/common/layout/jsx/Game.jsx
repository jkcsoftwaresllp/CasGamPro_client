import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../style/Game.module.css";
import { BetSection } from "./BetSection";
import { GameHistory } from "./GameHistory";
import { GameInterface } from "./GameInterface";
import { SimulationSection } from "./SimulationSection";
import { StakeSection } from "./StakeSection";
import { validateUrlParams } from "../helper/validateUrlParams";

export const Game = () => {
  const [betItems, setBetItems] = useState(null);
  const [game, setGame] = useState("");
  const [roundId, setRoundId] = useState("");
  const [error, setError] = useState(null); // To track errors
  const location = useLocation();

  // Extract gameName and roundId from the query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const gameName = queryParams.get("gameName");
    const roundId = queryParams.get("roundId");

    if (gameName && roundId) {
      const errorMessage = validateUrlParams(gameName, roundId);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setGame(gameName);
        setRoundId(roundId);
        setError(null); // Reset error if valid
      }
    } else {
      setError("Missing gameName or roundId in URL");
    }
  }, [location.search]); // Re-run whenever the search query changes

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

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
