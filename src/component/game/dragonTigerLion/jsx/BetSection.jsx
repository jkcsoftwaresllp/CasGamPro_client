import React from "react";
import styles from "../style/BetSection.module.css";
import { BetRow } from "./BetRow";
import { BetHeading } from "./BetHeading";

export const BetSection = ({ onClick, isLock }) => {
  return (
    <div className={styles.betSection}>
      <BetHeading />
      <BetRow isLock={isLock} onClick={onClick} label={"Winner"} />
      <BetRow isLock={isLock} onClick={onClick} label={"Red"} />
      <BetRow isLock={isLock} onClick={onClick} label={"Black"} />
      <BetRow isLock={isLock} onClick={onClick} label={"Even"} />
      <BetRow isLock={isLock} onClick={onClick} label={"Odd"} />
    </div>
  );
};
