import React from "react";
import { GameTile } from "./gameTiles/GameTiles";
import style from "./style/GameList.module.css";

// images
import imgTeenPatti from "./img/teenPatti/image.png";
import imgLuckyB from "./img/luckSevenB/luckyB.jpg";
import imgAndarBahar from "./img/andarBahar/andarBahar.png";
import imgDragonTiger from "./img/dragonTiger/dragonTiger.png";
import { useButtonNavigation } from "../../../hooks/useButtonNavigation";
import { routesPathClient as path } from "../../routing/helper/routesPathClient";
import { GAME_TYPES, validGames } from "../../game/helper/gameTypes";

export const GameList = () => {
  const handleCardClick = useButtonNavigation();
  const { game: getGamePath } = path;
  const andarBahar1 = validGames[0];
  const andarBahar2 = validGames[1];
  const lucky7B = validGames[2];
  const teenPattiT20 = validGames[3];
  const dragonTiger = validGames[4];
  const dragonTigerLion = validGames[5];
  const dragonTigerTwo = validGames[6];
  const lucky7A = validGames[7];

  return (
    <div className={style.gameListWrapper}>
      <div className={style.gameList}>
        <GameTile
          imgSrc={imgTeenPatti}
          label="Teen Patti T-20"
          onClick={() => handleCardClick(getGamePath(teenPattiT20))}
          gameId={GAME_TYPES[teenPattiT20]}
        />
        <GameTile
          imgSrc={imgLuckyB}
          label="Luck 7B"
          onClick={() => handleCardClick(getGamePath(lucky7B))}
          gameId={GAME_TYPES[lucky7B]}
        />
        <GameTile
          imgSrc={imgAndarBahar}
          label="Andar Bahar 1"
          onClick={() => handleCardClick(getGamePath(andarBahar1))}
          gameId={GAME_TYPES[andarBahar1]}
        />

        <GameTile
          imgSrc={imgAndarBahar}
          label="Andar Bahar 2"
          onClick={() => handleCardClick(getGamePath(andarBahar2))}
          gameId={GAME_TYPES[andarBahar2]}
        />

        <GameTile
          imgSrc={imgDragonTiger}
          label="20-20 Dragon Tiger"
          onClick={() => handleCardClick(getGamePath(dragonTiger))}
          gameId={GAME_TYPES[dragonTiger]}
        />

        <GameTile
          imgSrc={imgDragonTiger}
          label="20 20 DTL"
          onClick={() => handleCardClick(getGamePath(dragonTigerLion))}
          game
          Id={GAME_TYPES[dragonTigerLion]}
        />

        <GameTile
          imgSrc={imgDragonTiger}
          label="20-20 Dragon Tiger Two"
          onClick={() => handleCardClick(getGamePath(dragonTigerTwo))}
          gameId={GAME_TYPES[dragonTigerTwo]}
        />

        <GameTile
          imgSrc={imgLuckyB}
          label="Luck 7A"
          onClick={() => handleCardClick(getGamePath(lucky7A))}
          gameId={GAME_TYPES[lucky7A]}
        />

        <GameTile
          imgSrc="https://media.giphy.com/media/10SvWCbt1ytWCc/giphy.gif"
          label="Card Title 4"
          onClick={() => {}}
          gameId={""}
        />
      </div>
    </div>
  );
};
