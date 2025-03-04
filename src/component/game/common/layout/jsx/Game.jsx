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
import { Winner } from "./Winner";

export const Game = () => {
  const { gameType, error } = useQueryParams();
  const gameState = useGameState();
  const { roundId: gameId, status, winner, startTime, cards } = gameState;
  const [betItems, setBetItems] = useState();

  // console.log("gameState", gameState);

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
        <Winner gameType={gameType} winner={winner} />
      ) : (
        <>
          <div className={styles.game}>
            <div className={styles.mainContent}>
              <div className={styles.gameControls}>
                <div className={styles.gameInterface}>
                  <GameInterface
                    game={gameType}
                    roundId={rountId}
                    cards={cards}
                    status={status}
                  />
                </div>
                <div className={styles.simulationSection}>
                  <SimulationSection />
                </div>
              </div>

              <div className={styles.betSection}>
                <BetSection
                  status={status}
                  game={gameType}
                  onClick={(label, value) => setBetItems({ label, value })}
                />
              </div>
            </div>

            <div className={styles.detailsSection}>
              <GameHistory />
              <StakeSection
                betItems={betItems}
                setBetItems={setBetItems}
                status={status}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
