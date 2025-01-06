import React from "react";
import style from "./style/MainHeader.module.css";

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.headerLeft}>PLACE BET</div>
      <div className={style.headerRight}>Range : 100 - 5000</div>
    </header>
  );
};
