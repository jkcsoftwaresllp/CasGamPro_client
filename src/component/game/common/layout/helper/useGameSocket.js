import { useEffect } from "react";
import {
  connectSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
} from "../../../helper/socketService";
import { GAME_TYPES } from "../../../helper/gameTypes";

export const useGameSocket = (
  gameType,
  setTotalCards,
  setGameId,
  setStatus,
  setWinner,
  setStartTime
) => {
  useEffect(() => {
    if (!gameType) return;

    const socket = connectSocket("game");

    socket.on("connect", () => {
      emitEvent("joinGameType", GAME_TYPES[gameType]);
    });

    subscribeToEvent("gameStateUpdate", (updatedState) => {
      if (updatedState) {
        const {
          andarCards,
          baharCards,
          gameId,
          status,
          winner,
          startTime,
          jokerCard,
        } = updatedState;

        // Update the relevant state
        setGameId(gameId);
        setStatus(status);
        setWinner(winner);
        setStartTime(startTime);

        // Combine cards
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

        if (jokerCard !== null)
          setTotalCards([jokerCard, null, ...combinedCards]);
      }
    });

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
  }, [gameType, setTotalCards, setGameId, setStatus, setWinner, setStartTime]);
};
