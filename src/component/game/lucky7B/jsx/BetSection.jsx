import React from "react";
import styles from "../style/BetSection.module.css";

import { BetOnEvOdReBl } from "../../common/BetSection/jsx/BetOnEvOdReBl";
import { BetCardSection } from "../../common/BetSection/jsx/BetCardSection";
import { BetWithText } from "../../common/BetSection/jsx/BetWithText";
import { BetOnCard } from "../../common/BetSection/jsx/BetOnCard";

import { PLAYER_SIDES } from "../../../../utils/gamePlayerSides";

export const BetSection = ({ onClick, isLock }) => {
  const { lucky7B: SIDE } = PLAYER_SIDES;

  return (
    <div className={styles.betSection}>
      <div className={styles.lowHighEvenOdd}>
        <div className={styles.lowHigh}>
          <BetWithText
            label={"Low"}
            betProfit={1.96}
            betAmount={"0.0"}
            isLock={isLock}
            onClick={(label, value) =>
              onClick({ label, player: SIDE.low }, value)
            }
            // onClick={(label, value) => onClick({ label: "Player A", player: SIDE.playerA }, value)}
          />

          <BetOnCard
            label={"7"}
            betProfit={9}
            betAmount={"0.0"}
            isLock={isLock}
            onClick={(label, value) =>
              onClick({ label, player: SIDE.mid }, value)
            }
          />

          <BetWithText
            label={"High"}
            betProfit={1.96}
            betAmount={"0.0"}
            isLock={isLock}
            onClick={(label, value) =>
              onClick({ label, player: SIDE.high }, value)
            }
          />
        </div>
        <BetOnEvOdReBl
          onClick={onClick}
          isLock={isLock}
          betAmount={{ even: "0.0", odd: "0.0", red: "0.0", black: "0.0"}}
          betProfit={{ even: 2.1, odd: 1.79, red: 1.95, black: 1.95 }}
        />
      </div>
      <BetCardSection
        onClick={onClick}
        isLock={isLock}
        betAmount={{ 2: "0.00" }}
        betProfit={9}
        player=""
      />
    </div>
  );
};
