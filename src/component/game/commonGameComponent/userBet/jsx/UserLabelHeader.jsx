import React from "react";
import UserLabel from "../jsx/UserLabel";
import style from "../style/UserLabelHeader.module.css";

const UserLabelHeader = ({
  name = "Name",
  odd = "Odd",
  stake = "Stake",
  profit = "P/L",
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
