import React from "react";
import styles from "../style/Winner.module.css";

export const Winner = ({ gameType, winner }) => {
  const winnerList = Array.isArray(winner)
    ? winner.map((w) => w.toUpperCase()).join(", ")
    : winner.toUpperCase();

  // let result = "";
  // if (gameType === "andarBahar")
  //   result = winner === "playerA" ? "Andar" : "Bahar";
  // else if (gameType === "TP1")
  //   result = winner === "playerA" ? "Player A" : "Player B";
  // else if (gameType === "L7B") result = winner[1] < "7" ? "Low" : "High";
  return <div className={styles.winner}> Winner: {winnerList}</div>;
};
