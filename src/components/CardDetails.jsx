import React from "react";
import styles from "./css/CardDetails.module.css";
import { CardRender } from "./CardRender";

export const CardDetails = ({ playerACards, playerBCards }) => {
  return (
    <>
      <div className={styles.container}>
        <CardRender playerName={"Player A"} cards={playerACards} />
        <CardRender playerName={"Player B"} cards={playerBCards} />
      </div>
    </>
  );
};
