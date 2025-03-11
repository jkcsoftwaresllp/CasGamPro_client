import React from "react";
import styles from "../styles/BetOnEvOdReBl.module.css";
import { BetWithColor } from "./BetWithColor";
import { BetWithText } from "./BetWithText";
import { PLAYER_SIDES } from "../../../../../utils/gamePlayerSides";

export const BetOnEvOdReBl = ({
  onClick,
  isLock,
  betAmount = {},
  betProfit = null,
  player = "",
}) => {
  const { L7B: SIDE } = PLAYER_SIDES;
  const playerLower = player.toLowerCase();

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
        onClick={(label, value) =>
          onClick({ label, player: `${playerLower}${SIDE.even}` }, value)
        }
        isLock={isLock}
      />
      <BetWithText
        label="Odd"
        betProfit={profit.odd}
        betAmount={amount.odd}
        onClick={(label, value) =>
          onClick({ label, player: `${playerLower}${SIDE.odd}` }, value)
        }
        isLock={isLock}
      />
      <BetWithColor
        color="red"
        betProfit={profit.red}
        betAmount={amount.red}
        onClick={(label, value) =>
          onClick({ label, player: `${playerLower}${SIDE.red}` }, value)
        }
        isLock={isLock}
      />
      <BetWithColor
        color="black"
        betProfit={profit.black}
        betAmount={amount.black}
        onClick={(label, value) =>
          onClick({ label, player: `${playerLower}${SIDE.black}` }, value)
        }
        isLock={isLock}
      />
    </div>
  );
};
