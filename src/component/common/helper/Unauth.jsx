import React from "react";
import login from "../images/login.svg";

export const Unauth = ({ handleLoginClick, style, label }) => (
  <img
    src={login}
    alt="Login"
    className={style.loginIcon}
    onClick={handleLoginClick}
    title={label}
  />
);
