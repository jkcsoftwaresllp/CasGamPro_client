import React from "react";
import styles from "../style/GameName.module.css";
import { gameNameMap } from "../../../helper/gameTypes.js";

export const GameName = ({ game, roundId = "A85745846" }) => {
  const gameName = gameNameMap[game] || "Error";

  return (
    <div className={styles.gameHeader}>
      <div className={styles.gameDetail}>{gameName}</div>
      <div className={styles.gameRoundId}>{roundId}</div>
    </div>
  );
};
