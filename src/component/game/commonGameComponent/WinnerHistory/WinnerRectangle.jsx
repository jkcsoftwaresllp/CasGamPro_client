import React from "react";
import WinnerBox from "./WinnerBox";
import style from "./style/WinnerHistory.module.css";

const WinnerRectangle = ({ results }) => {
  return (
    <div className={style.WinnerRectangle}>
      {results.map((result, index) => (
        <WinnerBox key={index} winner={result} />
      ))}
    </div>
  );
};

export default WinnerRectangle;
