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
  const namespace = "game";

  useEffect(() => {
    if (!gameType) return;

    const socket = connectSocket(namespace);

    socket.on("connect", () => {
      emitEvent(namespace, "joinGame", {userId: 3, gameType: GAME_TYPES[gameType]});
    });

    subscribeToEvent(namespace, "gameStateUpdate", (updatedState) => {
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
