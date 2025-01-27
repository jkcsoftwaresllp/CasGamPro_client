import { useEffect } from "react";
import {
  connectSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
} from "../../../helper/socketService";
import { GAME_TYPES } from "../../../helper/gameTypes";
import { useGameDispatch } from "./GameStateContext";

export const useGameSocket = (gameType) => {
  const dispatch = useGameDispatch();


  useEffect(() => {
    if (!gameType) return;

    const socket = connectSocket("game");

    socket.on("connect", () => {
      emitEvent("joinGameType", GAME_TYPES[gameType]);
    });

    subscribeToEvent("gameStateUpdate", (updatedState) => {
      if (updatedState) {
        console.log("Game state updated:", updatedState);

        // Dispatch an action to update the game state
        dispatch({
          type: "UPDATE_GAME_STATE",
          payload: {
            gameType: updatedState.gameType,
            gameId: updatedState.gameId,
            status: updatedState.status,
            cards: updatedState.cards,
            winner: updatedState.winner,
            startTime: updatedState.startTime,
          },
        });
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
  }, [gameType, dispatch]);
};
