import React from "react";
import { GameTile } from "./gameTiles/GameTiles";
import style from "./style/GameList.module.css";

// images
import teenPatti from "./img/teenPatti/image.png";
import luckyB from "./img/luckSevenB/luckyB.jpg";
import andarBahar from "./img/andarBahar/andarBahar.png";
import { useButtonNavigation } from "../../../hooks/useButtonNavigation";
import { routesPathClient as path } from "../../routing/helper/routesPathClient";

export const GameList = () => {
  const handleCardClick = useButtonNavigation();
  const { game: getGamePath } = path;

  return (
    <div className={style.gameListWrapper}>
      <div className={style.gameList}>
        <GameTile
          imgSrc={teenPatti}
          label="Teen Patti T-20"
          onClick={() => handleCardClick(getGamePath("teenPattiT20"))}
        />
        <GameTile
          imgSrc={luckyB}
          label="Luck 7B"
          onClick={() => handleCardClick(getGamePath("lucky7B"))}
        />
        <GameTile
          imgSrc={andarBahar}
          label="Andar Bahar 1"
          onClick={() => handleCardClick(getGamePath("andarBahar1"))}
        />

        <GameTile
          imgSrc={andarBahar}
          label="Andar Bahar 2"
          onClick={() => handleCardClick(getGamePath("andarBahar2"))}
        />
        {/* 
        <GameTile
          imgSrc={andarBahar}
          label="20-20 Dragon Tiger"
          onClick={() => handleCardClick(getGamePath("dragonTiger"))}
        /> */}
        <GameTile
          imgSrc="https://media.giphy.com/media/10SvWCbt1ytWCc/giphy.gif"
          label="Card Title 4"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
