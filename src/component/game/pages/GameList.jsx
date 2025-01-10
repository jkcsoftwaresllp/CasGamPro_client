import React from "react";
import ReactDOM from "react-dom";
import { Card } from "../common/gameTiles/GameTiles";
import teenPatti from "./img/teenPatti/image.png";
import luckyB from "./img/luckSevenB/luckyB.jpg";
import andarBahar from "./img/andarBahar/andarBahar.png";
import style from "./style/GameList.module.css";

export const GameList = () => {
  return (
    <div className={style.flexContainer}>
      <Card
        imgSrc={teenPatti}
        label="Teen Patti"
        onClick={() => alert("Card clicked!")}
        className={style.card}
      />
      <Card
        imgSrc={luckyB}
        label="Lucky 7B"
        onClick={() => alert("Card clicked!")}
      />
      <Card
        imgSrc={andarBahar}
        label="Andar Bahar"
        onClick={() => alert("Card clicked!")}
      />
    </div>
  );
};
