import React from "react";
import style from "../../style/Rules.module.css"; // Adjust the path to your CSS file

export const RotatingMessage = ({ headerMsg }) => {
  return (
    <div className={style.rotateContainer}>
      <div className={style.rotating}>{headerMsg}</div>
    </div>
  );
};
