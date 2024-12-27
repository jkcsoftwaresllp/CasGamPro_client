// Window.js
import React from "react";

import style from "./styles/Tab.module.css";

export const Tab = ({ icon, title, onClickValue }) => {
  return (
    <div className={style.tab} onClick={() => onClickValue}>
      <img src={icon} className={style.icon} />
      <div className={style.text}>{title}</div>
    </div>
  );
};
