import React from "react";
import styles from "../styles/BetOnEvOdReBl.module.css";
import { BetWithColor } from "./BetWithColor";
import { BetWithText } from "./BetWithText";

export const BetOnEvOdReBl = ({
  onClick,
  isLock,
  betAmount = {},
  betProfit = null,
}) => {
  let profit = betProfit;
  if (profit === null) {
    profit = {
      even: "2.10",
      odd: "1.79",
      red: "1.95",
      black: "1.95",
    };
  }

  let amount = betAmount;
  if (amount.even === undefined) amount.even = "0.0";
  if (amount.odd === undefined) amount.odd = "0.0";
  if (amount.red === undefined) amount.red = "0.0";
  if (amount.black === undefined) amount.black = "0.0";

  return (
    <div className={styles.betOnEvOdReBl}>
      <BetWithText
        label="Even"
        betProfit={profit.even}
        betAmount={amount.even}
        onClick={onClick}
        isLock={isLock}
      />
      <BetWithText
        label="Odd"
        betProfit={profit.odd}
        betAmount={amount.odd}
        onClick={onClick}
        isLock={isLock}
      />
      <BetWithColor
        color="red"
        betProfit={profit.red}
        betAmount={amount.red}
        onClick={onClick}
        isLock={isLock}
      />
      <BetWithColor
        color="black"
        betProfit={profit.black}
        betAmount={amount.black}
        onClick={onClick}
        isLock={isLock}
      />
    </div>
  );
};
