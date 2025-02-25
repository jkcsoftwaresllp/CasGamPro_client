import React from "react";
import { HeaderBtnGroup } from "./HeaderBtnGroup";
import style from "../style/ClientHeader.module.css";
import { Heart } from "./heart";

export const ClientHeader = () => {
  return (
    <div className={style.mainContainer}>
      {/* Display user ID */}

      <div className={style.flexContainer}>
        <HeaderBtnGroup />
        <Heart />
      </div>
    </div>
  );
};
