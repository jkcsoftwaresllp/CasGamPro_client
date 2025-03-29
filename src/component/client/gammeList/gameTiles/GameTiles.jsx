// GameTile.js
import React from "react";
import style from "./style/GameTiles.module.css";
import { FavBtn } from "./FavBtn";

export const GameTile = ({ imgSrc, label, onClick, gameId, isFavourite }) => {
  return (
    <div className={style.cardsList} onClick={onClick}>
      <div className={style.card}>
        <FavBtn
          className={style.favBtn}
          gameId={gameId}
          isFavourite={isFavourite}
        />
        <div className={style.cardImage}>
          <img src={imgSrc} alt="Card" />
        </div>
        <div className={`${style.cardTitle} ${style.titleWhite}`}></div>
      </div>
      <p className={style.titleLabel}>{label}</p>
    </div>
  );
};
