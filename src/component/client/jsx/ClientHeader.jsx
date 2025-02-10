import React from "react";
import { HeaderBtnGroup } from "./HeaderBtnGroup";
import style from "../style/ClientHeader.module.css";
import { Heart } from "./heart";
import { Wallet } from "./Wallet";
import { useAuth } from "../../../context/jsx/AuthContext";

export const ClientHeader = () => {
  const { user } = useAuth(); // Get user from AuthContext

  return (
    <div className={style.mainContainer}>
      {/* Display user ID */}
      {user && <p className={style.userId}>User ID: {user.id}</p>}

      <div className={style.flexContainer}>
        <HeaderBtnGroup />
        <Heart />
        <Wallet />
      </div>
    </div>
  );
};
