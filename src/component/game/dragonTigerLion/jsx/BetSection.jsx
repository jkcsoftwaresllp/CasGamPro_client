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

  return (
    <div className={styles.betSection}>
      <BetHeading />
      <BetRow
        isLock={isLock}
        onClick={onClick}
        label={"Winner"}
        player={winner}
      />
      <BetRow isLock={isLock} onClick={onClick} label={"Red"} player={red} />
      <BetRow
        isLock={isLock}
        onClick={onClick}
        label={"Black"}
        player={black}
      />
      <BetRow isLock={isLock} onClick={onClick} label={"Even"} player={even} />
      <BetRow isLock={isLock} onClick={onClick} label={"Odd"} player={odd} />
    </div>
  );
};
