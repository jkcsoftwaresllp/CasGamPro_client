import React from "react";
import styles from "../style/BetSection.module.css";
import { BetProfit } from "../../common/BetSection/jsx/BetProfit";
import { PlayerLabel } from "../../common/BetSection/jsx/PlayerLabel";

export const BetSection = ({ onClick, isLock }) => {
  return (
    <div className={styles.betSection}>
      <div className={styles.betPlacing}>
        <PlayerLabel label="Player A" betPlaced="0.0" />
        <BetProfit
          betProfit={1.96}
          isLock={isLock}
          onClick={(value) => {
            onClick({ label: "Player A" }, value);
          }}
        />
      </div>

      <div className={styles.betPlacing}>
        <PlayerLabel label="Player B" betPlaced="0.0" />
        <BetProfit
          betProfit={1.96}
          isLock={isLock}
          onClick={(value) => {
            onClick({ label: "Player B" }, value);
          }}
        />
      </div>
    </div>
  );
};
