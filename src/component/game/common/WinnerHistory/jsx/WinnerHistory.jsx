import React, { useEffect, useState } from "react";
import { WinnerRectangle } from "./WinnerRectangle";
import style from "../style/WinnerHistory.module.css";
import { useGameState } from "../../layout/helper/GameStateContext";
import { apiCall } from "../../../../common/apiCall";

export const WinnerHistory = () => {
  let [results, setResult] = useState([]);

  const gameState = useGameState();
  const { gameType } = gameState;

  useEffect(() => {
    const upadatHistory = async () => {
      try {
        const response = await apiCall(
          `/auth-api/client/games/history?gameType=${gameType}`,
          "GET"
        );
        setResult(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (gameType) upadatHistory();
  }, [gameType]);

  return (
    <div className={style.WinnerHistory}>
      <h3>Last Results</h3>
      <WinnerRectangle results={results} />
    </div>
  );
};
