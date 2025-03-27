import React from "react";
import styles from "../style/GameInterface.module.css";
import { gameNameMap } from "../../../helper/gameTypes";

export const GameName = ({ game, roundId = "A85745846", cards, status }) => {
  const gameName = gameNameMap[game] || "Error";

  return (
    <div className={styles.header}>
      <div className={styles.gameDetail}>{gameName}</div>
      <div className={styles.gameRoundId}>{roundId}</div>
    </div>
  );
};
