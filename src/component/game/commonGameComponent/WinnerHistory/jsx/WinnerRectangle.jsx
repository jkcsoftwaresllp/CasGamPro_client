import React from "react";
import WinnerBox from "./WinnerBox";
import style from "../style/WinnerHistory.module.css";

const WinnerRectangle = ({ gameId, results }) => {
  return (
    <div className={style.WinnerRectangle}>
      {results.map((results, index) => (
        <WinnerBox key={index} winner={results} />
      ))}
    </div>
  );
};

export default WinnerRectangle;
