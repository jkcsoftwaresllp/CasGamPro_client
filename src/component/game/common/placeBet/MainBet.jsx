import React from "react";
import { BetComponent } from "./betBody/BetComponent";
import { UserLabelHeader } from "./betBody/BetHeader";
import { MainHeader } from "./betHeader/MainHeader";

export const MainBet = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MainHeader />
      <UserLabelHeader />
      <BetComponent betFor="Andar" profit={0.96} stake={0} />
    </div>
  );
};

