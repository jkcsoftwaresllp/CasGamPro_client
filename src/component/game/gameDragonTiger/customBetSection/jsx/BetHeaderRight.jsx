import React from "react";
import { BetInCircle } from "../../../common/BetSection/jsx/BetInCircle";
import { BetInRectangle } from "../../../common/BetSection/jsx/BetInRectangle";
import styles from "../style/BetHeader.module.css";

export const BetHeaderRight = () => {
  const handleClick = (value) => {
    console.log("Clicked with value:", value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.betInRectangle}>
        <BetInRectangle
          label="Dragon"
          betProfit="0"
          betAmount="100"
          onClick={handleClick}
          isLock={false}
        />
      </div>
      <div className={styles.betInCircle}>
        <BetInCircle
          label="Circle 1"
          betProfit="0"
          betAmount="50"
          onClick={handleClick}
          isLock={false}
        />
      </div>
      <div className={styles.betInRectangle}>
        <BetInRectangle
          label="Tiger"
          betProfit="10"
          betAmount="200"
          onClick={handleClick}
          isLock={false}
        />
      </div>
    </div>
  );
};
