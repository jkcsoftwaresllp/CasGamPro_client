import React, { useEffect } from "react";
import { WinnerRectangle } from "./WinnerRectangle";
import style from "../style/WinnerHistory.module.css";
import {
  connectSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
} from "../../../helper/socketService";
import { GAME_TYPES } from "../../../helper/gameTypes";
import { useQueryParams } from "../../layout/helper/useQueryParams";

export const WinnerHistory = () => {
  const results = [
    { winner: "A", roundId: 1, gameId: 1 },
    { winner: "B", roundId: 2, gameId: 1 },
    { winner: "A", roundId: 3, gameId: 1 },
    { winner: "A", roundId: 4, gameId: 1 },
    { winner: "B", roundId: 5, gameId: 1 },
    { winner: "A", roundId: 1, gameId: 1 },
    { winner: "B", roundId: 2, gameId: 1 },
    { winner: "A", roundId: 3, gameId: 1 },
    { winner: "A", roundId: 4, gameId: 1 },
    { winner: "B", roundId: 5, gameId: 1 },
  ]; // Move the results array here

  console.log("Man");

  const { gameType, error } = useQueryParams();

  useEffect(() => {
    const socket = connectSocket("game-history");

    console.log(GAME_TYPES[gameType]);

    socket.on("connect", () => {
      emitEvent("joinGameHistory", GAME_TYPES[gameType]);
    });

    subscribeToEvent("historyUpdate", (historyUpdate) => {
      if (historyUpdate) {
        //Work
        console.log(historyUpdate);
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
  }, [gameType]);

  return (
    <div className={style.WinnerHistory}>
      <h3>Last Results</h3>
      <WinnerRectangle results={results} />
    </div>
  );
};
