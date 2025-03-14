import React, { useEffect, useState } from "react";
import { GameTile } from "./gameTiles/GameTiles";
import style from "./style/GameList.module.css";

// images
import casinoImg from "./img/casinoGames.jpg";

import { useButtonNavigation } from "../../../hooks/useButtonNavigation";

import { apiCall } from "../../common/apiCall";
import { Loader } from "../../common/Loader";
import { ErrorPage } from "../../../pages/jsx/Error";

export const GameList = ({ catagory }) => {
  const handleCardClick = useButtonNavigation();
  const [games, setGames] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall(
          `/auth-api/client/games/categories/${catagory.id}`,
          "GET"
        );

        console.log("API call for Game List", response);

        if (response?.uniqueCode === "CGP0013") {
          setGames(response.data);
        } else {
          setError("Failed to fetch  Game List.");
        }
      } catch (err) {
        setError("An error occurred while fetching Game List.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorPage errorCode="ERR500" errorMessage={error} />;

  return (
    <div className={style.gameListWrapper}>
      <div className={style.gameList}>
        {games.map((game) => {
          return (
            <GameTile
              key={game.id}
              imgSrc={game.img || casinoImg}
              label={game.name}
              onClick={() => handleCardClick(`/game?gameName=${game.gameId}`)}
              gameType={game.gameType}
              isFavourite={game.isFavourite}
            />
          );
        })}
      </div>
    </div>
  );
};
