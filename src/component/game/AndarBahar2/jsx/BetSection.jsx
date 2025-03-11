import React from "react";
import styles from "../style/BetSection.module.css";
import { PlayerLabel } from "../../common/BetSection/jsx/PlayerLabel";
import { BetProfit } from "../../common/BetSection/jsx/BetProfit";
import { PLAYER_SIDES } from "../../../../utils/gamePlayerSides";

export const BetSection = ({ onClick, isLock }) => {
  const playerA = "andar";
  const playerB = "bahar";

  const { AB2: SIDE } = PLAYER_SIDES;

  return (
    <div className={styles.betSection}>
      <div className={styles.betPlacing}>
        <PlayerLabel label={playerA} betPlaced="0.0" />
        <BetProfit
          betProfit={1.96}
          isLock={isLock}
          onClick={(value) => {
            onClick({ label: playerA, player: SIDE.andar }, value);
          }}
        />
      </div>

      <div className={styles.betPlacing}>
        <PlayerLabel label={playerB} betPlaced="0.0" />
        <BetProfit
          betProfit={1.96}
          isLock={isLock}
          onClick={(value) => {
            onClick({ label: playerB, player: SIDE.bahar }, value);
          }}
        />
      </div>
    </div>
  );
};
