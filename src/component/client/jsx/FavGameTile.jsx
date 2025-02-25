import React from "react";
import styles from "../style/FavGame.module.css"; // Importing the styles from the CSS module
import { routesPathClient as path } from "../../routing/helper/routesPathClient";
import { useNavigate } from "react-router-dom";

export const FavGameTile = ({ label, gameType, closeModal }) => {
  const navigate = useNavigate();
  const { game: getGamePath } = path;
  const basePath = `${path.client}${path.gameCatagory}${path.catagory1}`;

  const validGames = {
    ANDAR_BAHAR: "andarBahar1",
    ANDAR_BAHAR_TWO: "andarBahar2",
    LUCKY7B: "lucky7B",
    TEEN_PATTI: "teenPattiT20",
    DRAGON_TIGER: "dragonTiger",
    DRAGON_TIGER_LION: "dragonTigerLion",
  };

  const move = `${basePath}${getGamePath(validGames[gameType])}`;

  return (
    <div
      className={styles.cardContainer}
      onClick={() => {
        navigate(move);
        closeModal();
      }}
    >
      <span className={styles.label}>{label}</span>
    </div>
  );
};
