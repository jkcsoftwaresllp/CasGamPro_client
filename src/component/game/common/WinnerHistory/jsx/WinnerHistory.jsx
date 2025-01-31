import React, { useEffect } from "react";
import { WinnerRectangle } from "./WinnerRectangle";
import style from "../style/WinnerHistory.module.css";
import { useGameState } from "../../layout/helper/GameStateContext";
import { apiCall } from "../../../../common/apiCall";

export const WinnerHistory = () => {
  let results = [
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

  const gameState = useGameState();
  const { gameType } = gameState;

  useEffect(() => {
    const upadatHistory = async () => {
      try {
        const response = await apiCall(
          `/auth-api/client/games/history?gameType=${gameType}`,
          "GET"
        );
        console.log({ gameType });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    upadatHistory();
  }, [gameType]);

  return (
    <div className={style.WinnerHistory}>
      <h3>Last Results</h3>
      <WinnerRectangle results={results} />
    </div>
  );
};
