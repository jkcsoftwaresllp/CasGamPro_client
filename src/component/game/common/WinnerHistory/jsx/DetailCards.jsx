import React from "react";
import style from "../style/Window.module.css";

export const DetailCards = ({ cards }) => {
  return (
    <div className={style.CardScrollContainer}>
      {cards.map((card) => (
        <div key={card.id} className={style.Card}>
          <div className={style.CardContent}>
            <p>{card.value}</p>
            <p>{card.suit}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
