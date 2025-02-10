import React from "react";
import { HeaderBtnAgent } from "./HeaderBtnAgent";
import style from "../styles/AgentHeader.module.css";
import { DropdownMenu } from "./Dropdown";
import { Notification } from "./Notification";
import { useAuth } from "../../../../context/jsx/AuthContext";

export const AgentHeader = () => {
  const { user } = useAuth(); // Get user from AuthContext

  return (
    <div className={style.mainContainer}>
      {/* Display user ID */}
      {user && <p className={style.userId}>User ID: {user.id}</p>}

      <div className={style.flexContainer}>
        <HeaderBtnAgent />
        <Notification />
        <DropdownMenu />
      </div>
    </div>
  );
};
