import { useEffect } from "react";
import {
  connectSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
} from "../../../helper/socketService";
import { GAME_TYPES } from "../../../helper/gameTypes";
import { useGameDispatch } from "./GameStateContext";
import { useAuth } from "../../../../../context/jsx/AuthContext";

export const useGameSocket = (gameType) => {
  const dispatch = useGameDispatch();
  const namespace = "game";
  const { user } = useAuth();

  useEffect(() => {
    if (!gameType && !user) return;

    const socket = connectSocket(namespace);

    socket.on("connect", () => {
      emitEvent(namespace, "joinGame", {
        userId: user.userId,
        gameType: GAME_TYPES[gameType],
      });
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
      disconnectSocket(namespace);
    };
  }, [gameType, dispatch]);
};
