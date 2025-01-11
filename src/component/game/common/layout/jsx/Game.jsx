import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../style/Game.module.css";
import { BetSection } from "./BetSection";
import { GameHistory } from "./GameHistory";
import { GameInterface } from "./GameInterface";
import { SimulationSection } from "./SimulationSection";
import { StakeSection } from "./StakeSection";
import { validateUrlParams } from "../helper/validateUrlParams";
import { GAME_TYPES } from "../../../helper/gameTypes";
import {
  connectSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
} from "../../../helper/socketService";

export const Game = () => {
  // State variables
  const [betItems, setBetItems] = useState(null);
  const [gameType, setGameType] = useState(null);
  const [roundId, setRoundId] = useState("");
  const [totalCards, setTotalCards] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [status, setStatus] = useState(null);
  const [winner, setWinner] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [error, setError] = useState(null); // For error handling

  const location = useLocation();

  /**
   * Extract gameName and roundId from URL query parameters
   * Validate the parameters and update state accordingly
   */
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const gameName = queryParams.get("gameName");
    const roundId = queryParams.get("roundId");

    if (gameName && roundId) {
      const errorMessage = validateUrlParams(gameName, roundId);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setGameType(gameName);
        setRoundId(roundId);
        setError(null); // Reset error state
      }
    } else {
      setError("Missing gameName or roundId in URL");
    }
  }, [location.search]);

  useEffect(() => {
    if (!gameType) return;

    const socket = connectSocket("game");

    // Join the appropriate game type
    socket.on("connect", () => {
      emitEvent("joinGameType", GAME_TYPES[gameType]);
    });

    // Listen for game state updates and process cards
    subscribeToEvent("gameStateUpdate", (updatedState) => {
      if (updatedState) {
        const {
          andarCards,
          baharCards,
          gameId,
          gameType,
          jokerCard,
          startTime,
          status,
          winner,
        } = updatedState;

        setGameId(gameId);
        setStatus(status);
        setWinner(winner);
        setStartTime(startTime);

        // Combine cards and store in totalCards
        const maxLength = Math.max(andarCards.length, baharCards.length);
        const combinedCards = [];

        for (let i = 0; i < maxLength; i++) {
          if (i < baharCards.length && baharCards[i] !== null) {
            combinedCards.push(baharCards[i]);
          }
          if (i < andarCards.length && andarCards[i] !== null) {
            combinedCards.push(andarCards[i]);
          }
        }

        setTotalCards([jokerCard, ...combinedCards]);
      }
    });

    // Handle errors
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // Cleanup on component unmount
    return () => {
      disconnectSocket();
    };
  }, [gameType]);

  // Show error if validation fails or URL parameters are missing
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
            <GameInterface game={gameType} roundId={roundId} />
          </div>
          <div className={styles.simulationSection}>
            <SimulationSection />
          </div>
        </div>
        <BetSection
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
    </div>
  );
};
