import React from "react";
import { UserLabel } from "../jsx/UserLabel";
import style from "../style/UserLabelList.module.css";

export const UserLabelList = ({ name, odd, stake, profit }) => {
  return (
    <div className={style.list}>
      <UserLabel label={name} />
      <UserLabel label={odd} />
      <UserLabel label={stake} />
      <UserLabel label={profit} />
    </div>
  );
};
