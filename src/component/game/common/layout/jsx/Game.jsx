import React, { useEffect, useState } from "react";
import styles from "../style/Game.module.css";
import { BetSection } from "./BetSection";
import { GameHistory } from "./GameHistory";
import { GameInterface } from "./GameInterface";
import { SimulationSection } from "./SimulationSection";
import { StakeSection } from "./StakeSection";
import { useQueryParams } from "../helper/useQueryParams";
import { useGameSocket } from "../helper/useGameSocket";
import { useGameState } from "../helper/GameStateContext";
import { extractRoundId } from "../helper/extractRoundId";
import { useButtonNavigation } from "../../../../../hooks/useButtonNavigation";

export const Game = () => {
  const { gameType, error } = useQueryParams();
  const { totalCards, gameId, status, winner, startTime } = useGameState();
  const [betItems, setBetItems] = useState();

  useGameSocket(gameType);
  const rountId = extractRoundId(gameId);
  const addRoundIdToURL = useButtonNavigation();

  useEffect(() => {
    addRoundIdToURL(`?gameName=${gameType}&roundId=${rountId}`);
  }, [gameType, rountId]);

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
                  roundId={rountId}
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
