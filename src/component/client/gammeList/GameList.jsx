import React from "react";
import { useNavigate } from "react-router-dom";
import { GameTile } from "./gameTiles/GameTiles";
import style from "./style/GameList.module.css";

// images
import teenPatti from "./img/teenPatti/image.png";
import luckyB from "./img/luckSevenB/luckyB.jpg";
import andarBahar from "./img/andarBahar/andarBahar.png";

export const GameList = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route); // Navigate to the provided route
  };

  return (
    <div className={style.gameListWrapper}>
      <div className={style.gameList}>
        <GameTile
          imgSrc={teenPatti}
          label="Teen Patti"
          onClick={() => handleCardClick("/teenPatti")} // Navigate to Teen Patti page
        />
        <GameTile
          imgSrc={luckyB}
          label="Luck 7B"
          onClick={() => handleCardClick("/luckyb")} // Navigate to Lucky B page
        />
        <GameTile
          imgSrc={andarBahar}
          label="Andar Bahar"
          onClick={() => handleCardClick("/andarBahar")} // Navigate to Andar Bahar page
        />
        <GameTile
          imgSrc="https://media.giphy.com/media/10SvWCbt1ytWCc/giphy.gif"
          label="Card Title 4"
          onClick={() => handleCardClick("/game4")} // Navigate to Game 4 page
        />
      </div>
    </div>
  );
};
