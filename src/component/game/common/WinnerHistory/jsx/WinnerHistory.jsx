import React from "react";
import {WinnerRectangle} from "./WinnerRectangle";
import style from "../style/WinnerHistory.module.css";

export const WinnerHistory = () => {
  const results = [
    { winner: "A", roundId: 1, gameId: 1 },
    { winner: "B", roundId: 2, gameId: 1 },
    { winner: "A", roundId: 3, gameId: 1 },
    { winner: "A", roundId: 4, gameId: 1 },
    { winner: "B", roundId: 5, gameId: 1 },
  ]; // Move the results array here

  return (
    <div className={style.WinnerHistory}>
      <h3>Last Results</h3>
      <WinnerRectangle results={results} />
    </div>
  );
};
