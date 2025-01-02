import React from "react";
import WinnerBox from "./WinnerBox";
import style from "../style/WinnerHistory.module.css";

const WinnerRectangle = ({ results }) => {
  return (
    <div className={style.WinnerRectangle}>
      {results.map((result, index) => (
        <WinnerBox
          key={index}
          winner={result.winner}
          gameId={result.gameId}
          roundId={result.roundId}
        />
      ))}
    </div>
  );
};

export default WinnerRectangle;
