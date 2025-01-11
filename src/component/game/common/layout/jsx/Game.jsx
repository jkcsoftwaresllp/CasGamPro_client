import React, { useState } from "react";
import styles from "../style/Game.module.css";
import { BetSection } from "./BetSection";
import { GameHistory } from "./GameHistory";
import { GameInterface } from "./GameInterface";
import { SimulationSection } from "./SimulationSection";
import { StakeSection } from "./StakeSection";
import { useQueryParams } from "../helper/useQueryParams";
import { useGameSocket } from "../helper/useGameSocket";

export const Game = () => {
  const { gameType, roundId, error } = useQueryParams();

  const [betItems, setBetItems] = useState(null);
  const [totalCards, setTotalCards] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [status, setStatus] = useState(null);
  const [winner, setWinner] = useState(null);
  const [startTime, setStartTime] = useState(null);

  // Use the custom hook for socket logic
  useGameSocket(
    gameType,
    setTotalCards,
    setGameId,
    setStatus,
    setWinner,
    setStartTime
  );

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.game}>
      {winner ? (
        <div className={styles.winner}>{winner}</div>
      ) : (
        <>
          <div className={styles.mainContent}>
            <div className={styles.gameControls}>
              <div className={styles.gameInterface}>
                <GameInterface
                  game={gameType}
                  roundId={roundId}
                  cards={totalCards}
                />
              </div>
              <div className={styles.simulationSection}>
                <SimulationSection />
              </div>
            </div>

            <BetSection
              status={status}
              game={gameType}
              onClick={(label, value) => {
                setBetItems({ label, value }); // Example: {label: "Low", value: "0.0"}
              }}
            />
          </div>

          <div className={styles.detailsSection}>
            <GameHistory />
            <StakeSection betItems={betItems} setBetItems={setBetItems} />
          </div>
        </>
      )}
    </div>
  );
};
