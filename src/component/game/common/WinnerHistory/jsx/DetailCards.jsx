import React from "react";
import style from "../style/Window.module.css";
import { ScrollBox } from "../../layout/jsx/ScrollBox";

export const DetailCards = ({ cards }) => {
  console.log(cards);
  return (
    <div className={style.detailCards}>
      <ScrollBox direction="horizontal">
        {cards.map((card) => (
          <div key={card} className={style.card}>
            {card}
          </div>
        ))}
      </ScrollBox>
    </div>
  );
};
