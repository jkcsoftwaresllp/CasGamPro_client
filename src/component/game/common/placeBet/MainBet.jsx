import React, { useState, useEffect } from "react";
import { BetComponent } from "./betBody/BetComponent";
import { UserLabelHeader } from "./betBody/BetHeader";
import { MainHeader } from "./betHeader/MainHeader";
import styles from "./MainBet.module.css";

export const MainBet = ({ betItems = {}, setBetItems }) => {
  const [player, setPlayer] = useState(null);
  const [label, setLabel] = useState(null);

  useEffect(() => {
    if (betItems && betItems.label && betItems.label.player) {
      setPlayer(betItems.label.player);
      setLabel(betItems.label.label.toUpperCase());
    } else {
      setPlayer(null);
      setLabel(betItems.label.toUpperCase());
    }
  }, [betItems]);

  return (
    <div className={styles.mainBet}>
      <MainHeader />
      <UserLabelHeader />
      <BetComponent
        betFor={label}
        profit={betItems.value}
        setBetItems={setBetItems}
        player={player}
      />
    </div>
  );
};
