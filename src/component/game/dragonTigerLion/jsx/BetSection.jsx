import React from "react";
import styles from "../style/BetSection.module.css";
import { BetRow } from "./BetRow";
import { BetHeading } from "./BetHeading";
import { PLAYER_SIDES } from "../../../../utils/gamePlayerSides";

export const BetSection = ({ onClick, isLock }) => {
  const { dragonTigerLion: SIDE } = PLAYER_SIDES;

  const winner = { d: SIDE.dragon, t: SIDE.tiger, l: SIDE.lion };
  const red = { d: SIDE.DR, t: SIDE.TR, l: SIDE.LR };
  const black = { d: SIDE.DB, t: SIDE.TB, l: SIDE.LB };
  const even = { d: SIDE.DE, t: SIDE.TE, l: SIDE.LE };
  const odd = { d: SIDE.DO, t: SIDE.TO, l: SIDE.LO };

  const winnerProfit = { d: 2.9, t: 2.9, l: 2.9 };
  const redProfit = { d: 1.97, t: 1.97, l: 1.97 };
  const blackProfit = { d: 1.97, t: 2.9, l: 2.9 };
  const evenProfit = { d: 2.42, t: 2.42, l: 2.42 };
  const oddProfit = { d: 1.83, t: 1.83, l: 1.83 };

  return (
    <div className={styles.betSection}>
      <BetHeading />
      <BetRow
        isLock={isLock}
        onClick={onClick}
        label={"Winner"}
        player={winner}
        profit={winnerProfit}
      />
      <BetRow
        isLock={isLock}
        onClick={onClick}
        label={"Red"}
        player={red}
        profit={redProfit}
      />
      <BetRow
        isLock={isLock}
        onClick={onClick}
        label={"Black"}
        player={black}
        profit={blackProfit}
      />
      <BetRow
        isLock={isLock}
        onClick={onClick}
        label={"Even"}
        player={even}
        profit={evenProfit}
      />
      <BetRow
        isLock={isLock}
        onClick={onClick}
        label={"Odd"}
        player={odd}
        profit={oddProfit}
      />
    </div>
  );
};
