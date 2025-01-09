import React from "react";
import { WinnerBox } from "./WinnerBox";
import style from "../style/WinnerHistory.module.css";
import { HorizontalScrollBox } from "../../layout/jsx/HorizontalScrollBox";

export const WinnerRectangle = ({ results }) => {
  return (
    <div className={style.WinnerRectangle}>
      <HorizontalScrollBox>
        {results.map((result, index) => (
          <WinnerBox
            key={index}
            winner={result.winner}
            gameId={result.gameId}
            roundId={result.roundId}
          />
        ))}
      </HorizontalScrollBox>
    </div>
  );
};
