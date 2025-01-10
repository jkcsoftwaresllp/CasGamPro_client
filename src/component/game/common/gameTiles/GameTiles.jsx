import React from "react";
import style from "./style/GameTiles.module.css";

export const Card = ({ imgSrc, label, onClick }) => {
  return (
    <section className={style.cards}>
      <article className={style.card}>
        <div
          className={style.cardImgHover}
          style={{ backgroundImage: `url(${imgSrc})` }}
          onClick={onClick}
        ></div>

        <div className={style.cardInfo}>
          <h3 className={style.cardTitle}>{label}</h3>
        </div>
      </article>
    </section>
  );
};
