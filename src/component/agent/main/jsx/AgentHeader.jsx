import React from "react";
import { HeaderBtnAgent } from "./HeaderBtnAgent";
import style from "../styles/AgentHeader.module.css";
import { DropdownMenu } from "./Dropdown";
import { Notification } from "./Notification";

export const AgentHeader = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.flexContainer}>
        <HeaderBtnAgent />
        <Notification />
        <DropdownMenu />
      </div>
    </div>
  );
};
