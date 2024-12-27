import React from "react";
import WinnerRectangle from "./WinnerRectangle";
import style from "./style/WinnerHistory.module.css";

const WinnerHistory = () => {
  const results = ["A", "B", "B", "B", "A", "B", "B", "A", "B", "B"]; // Move the results array here

  return (
    <div className={style.WinnerHistory}>
      <h3>Last Results</h3>
      <WinnerRectangle results={results} />
    </div>
  );
};

export default WinnerHistory;
