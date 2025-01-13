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
        const { gameType, gameId, status, cards, winner, startTime } =
          updatedState;

        console.log("Game state updated:", updatedState);
        // Update the relevant state
        setGameId(gameId);
        setStatus(status);
        setWinner(winner);
        setStartTime(startTime);
        setTotalCards(cards);
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

/*
 Response Comming from Server from gameStateUpdate

{
    "gameType": "ANDAR_BAHAR",
    "gameId": "ANDAR_BAHAR_1736751351661",
    "status": "dealing",
    "cards": {
        "jokerCard": "S3",
        "blindCard": null,
        "playerA": [
            "S5",
            "H7"
        ],
        "playerB": [
            "D8"
        ],
        "playerC": []
    },
    "winner": null,
    "startTime": 1736751351662
}



*/
