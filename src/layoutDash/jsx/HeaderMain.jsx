import React from "react";
import { UserInfo } from "./UserInfo";
import { HeaderBtnGroup } from "./HeaderBtnGroup";
import style from "../style/Header.module.css";

export const HeaderMain = () => {
  return (
    <div className={style.mainContainer}>
      <UserInfo userId="12345" userName="John Doe" balance="$1500" />
      <HeaderBtnGroup />
    </div>
  );
};
