import React from "react";
import styles from "../style/BetOnBottom.module.css";
import { BetInCircle } from "../../common/BetSection/jsx/BetInCircle";
import { BetInPair } from "../../common/BetSection/jsx/BetInPair";
import { BetInRectangle } from "../../common/BetSection/jsx/BetInRectangle";

export const BetOnTop = ({ onClick, isLock }) => {
  return (
    <div className={styles.betOnTop}>
      <div className={styles.rectangeCircle}>
        <BetInRectangle
          label={"Dragon"}
          betAmount={"0.0"}
          betProfit={"1.96"}
          isLock={isLock}
          onClick={(value) => onClick({ label: "Dragon" }, value)}
        />
        <BetInCircle
          label={"Tie"}
          betAmount={"0.0"}
          betProfit={"1.96"}
          isLock={isLock}
          onClick={(value) => onClick({ label: "Tie" }, value)}
        />
        <BetInRectangle
          label={"Tiger"}
          betAmount={"0.0"}
          betProfit={"1.96"}
          isLock={isLock}
          onClick={(value) => onClick({ label: "Tiger" }, value)}
        />
      </div>

      <BetInPair
        label={"Pair"}
        betAmount={"0.0"}
        betProfit={"6"}
        isLock={isLock}
        onClick={(value) => onClick({ label: "Pair" }, value)}
      />
    </div>
  );
};
