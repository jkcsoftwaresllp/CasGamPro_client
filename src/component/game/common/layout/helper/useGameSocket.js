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
      console.log("Socket Updated");
      if (updatedState) {
        dispatch({
          type: "UPDATE_GAME_STATE",
          payload: updatedState,
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
