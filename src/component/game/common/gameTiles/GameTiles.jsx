import React from "react";
import style from "./style/GameTiles.module.css";

export const GameTile = ({ imgSrc, label, onClick }) => {
  return (
    <div className={style.cardsList}>
      <div className={`${style.card}`} onClick={onClick}>
        <div className={style.cardImage}>
          <img src={imgSrc} alt="Card" />
        </div>
        <div className={`${style.cardTitle} ${style.titleWhite}`}></div>
      </div>
      <p>{label}</p>
    </div>
  );
};
