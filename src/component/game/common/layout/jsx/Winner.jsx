import React from "react";
import styles from "../style/Winner.module.css";

export const Winner = ({ gameType, winner }) => {
  const winnerList = Array.isArray(winner)
    ? winner.map((w) => w.toUpperCase()).join(", ")
    : winner.toUpperCase();
  console.log(winnerList);
  // let result = "";
  // if (gameType === "andarBahar")
  //   result = winner === "playerA" ? "Andar" : "Bahar";
  // else if (gameType === "teenPattiT20")
  //   result = winner === "playerA" ? "Player A" : "Player B";
  // else if (gameType === "lucky7B") result = winner[1] < "7" ? "Low" : "High";
  return <div className={styles.winner}> Winner: {winnerList}</div>;
};
