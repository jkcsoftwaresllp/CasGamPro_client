import React, { useState, useEffect } from "react";
import { BetComponent } from "./betBody/BetComponent";
import { UserLabelHeader } from "./betBody/BetHeader";
import { MainHeader } from "./betHeader/MainHeader";
import styles from "./MainBet.module.css";

export const MainBet = ({ betItems = {}, setBetItems }) => {
  const [player, setPlayer] = useState(null);
  const [label, setLabel] = useState(null);

  useEffect(() => {
    if (betItems?.label) {
      setPlayer(betItems.label.player || null);
      setLabel(betItems.label.label?.toUpperCase() || "");
    }
  }, [betItems?.label]);

  return (
    <div className={styles.mainBet}>
      <MainHeader />
      <UserLabelHeader />
      <BetComponent
        betFor={label}
        profit={parseFloat(betItems.value)}
        setBetItems={setBetItems}
        player={player}
      />
    </div>
  );
};
