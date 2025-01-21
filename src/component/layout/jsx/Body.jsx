import style from "../style/Body.module.css";
import React from "react";
import { Routing } from "./Routing";

export const Body = () => {
  return (
    <div className={style.bodyWrapper}>
      <div className={style.body}>
        <Routing />
      </div>
    </div>
  );
};
