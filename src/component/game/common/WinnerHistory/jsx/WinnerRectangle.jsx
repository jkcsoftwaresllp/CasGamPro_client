import React from "react";
import { WinnerBox } from "./WinnerBox";
import style from "../style/WinnerHistory.module.css";
import { ScrollBox } from "../../layout/jsx/ScrollBox";

export const WinnerRectangle = ({ results }) => {
  return (
    <div className={style.WinnerRectangle}>
      <ScrollBox direction="horizontal">
        {results.map((result, index) => (
          <WinnerBox
            key={index}
            winner={result.winner}
            gameName={result.gameName}
            roundId={result.roundId}
          />
        ))}
      </ScrollBox>
    </div>
  );
};
