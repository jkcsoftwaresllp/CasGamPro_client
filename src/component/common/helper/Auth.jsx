import React from "react";
import logout from "../images/logout.svg";
import style from "../style/HeaderMain.module.css";

export const Auth = ({ onclick, label }) => (
  <div>
    <img
      className={style.logout}
      src={logout}
      title={label}
      onClick={onclick}
    />
  </div>
);
