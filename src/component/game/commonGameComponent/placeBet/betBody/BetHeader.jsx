import React from "react";
import UserLabel from "../../userBet/jsx/UserLabel";
import style from "./style/BetHeader.module.css";

const UserLabelHeader = ({
  name = "(Bet For)",
  odd = "Odds",
  stake = "Stake",
  profit = "Profit",
}) => {
  return (
    <div className={style.labelHeader}>
      <UserLabel label={name} />
      <UserLabel label={odd} />
      <UserLabel label={stake} />
      <UserLabel label={profit} />
    </div>
  );
};

export default UserLabelHeader;
