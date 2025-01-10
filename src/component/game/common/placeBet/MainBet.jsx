import React from "react";
import { BetComponent } from "./betBody/BetComponent";
import { UserLabelHeader } from "./betBody/BetHeader";
import { MainHeader } from "./betHeader/MainHeader";
import styles from "./MainBet.module.css";

export const MainBet = ({ betItems = {}, setBetItems }) => {
  let player = null,
    label = null;

  if (betItems && betItems.player) {
    label = betItems.label.label;
    player = betItems.player.player;
  } else label = betItems.label.label;

  label = label.toUpperCase();

  return (
    <div className={styles.mainBet}>
      <MainHeader />
      <UserLabelHeader />
      <BetComponent
        betFor={label}
        profit={0.96}
        stake={0}
        setBetItems={setBetItems}
      />
    </div>
  );
};
