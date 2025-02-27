import React from "react";
import style from "../style/Window.module.css";
import { ScrollBox } from "../../layout/jsx/ScrollBox";

export const DetailCards = ({ cards }) => {
  const winnerList = Array.isArray(cards)
    ? cards.map((w) => w.toUpperCase()).join(", ")
    : cards.toUpperCase();
  return (
    <div className={style.detailCards}>
      <ScrollBox direction="horizontal">
        <p className={style.winner}>{winnerList}</p>
      </ScrollBox>
    </div>
  );
};
