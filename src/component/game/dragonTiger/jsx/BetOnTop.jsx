import React from "react";
import styles from "../style/BetOnBottom.module.css";
import { BetInCircle } from "../../common/BetSection/jsx/BetInCircle";
import { BetInPair } from "../../common/BetSection/jsx/BetInPair";
import { BetInRectangle } from "../../common/BetSection/jsx/BetInRectangle";
import { PLAYER_SIDES } from "../../../../utils/gamePlayerSides";

export const BetOnTop = ({ onClick, isLock }) => {
  const { DT20: SIDE } = PLAYER_SIDES;

  return (
    <div className={styles.betOnTop}>
      <div className={styles.rectangeCircle}>
        <BetInRectangle
          label={"Dragon"}
          betAmount={"0.0"}
          betProfit={1.96}
          isLock={isLock}
          onClick={(value) =>
            onClick({ label: "Dragon", player: SIDE.dragon }, value)
          }
        />
        <BetInCircle
          label={"Tie"}
          betAmount={"0.0"}
          betProfit={8}
          isLock={isLock}
          onClick={(value) =>
            onClick({ label: "Tie", player: SIDE.tie }, value)
          }
        />
        <BetInRectangle
          label={"Tiger"}
          betAmount={"0.0"}
          betProfit={1.96}
          isLock={isLock}
          onClick={(value) =>
            onClick({ label: "Tiger", player: SIDE.tiger }, value)
          }
        />
      </div>
      <div className={styles.pair}>
        <BetInPair
          label={"Pair"}
          betAmount={"0.0"}
          betProfit={6}
          isLock={isLock}
          onClick={(value) =>
            onClick({ label: "Pair", player: SIDE.pair }, value)
          }
        />
      </div>
    </div>
  );
};
