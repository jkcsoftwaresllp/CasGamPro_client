import React from "react";
import styles from "../style/FavGame.module.css"; // Importing the styles from the CSS module
import { routesPathClient as path } from "../../routing/helper/routesPathClient";
import { useNavigate } from "react-router-dom";

export const FavGameTile = ({ label, gameType, closeModal }) => {
  const navigate = useNavigate();
  const { game: getGamePath } = path;
  const basePath = `${path.client}${path.gameCatagory}${path.catagory1}`;

  const validGames = {
    ANDAR_BAHAR: "AB1",
    ANDAR_BAHAR_TWO: "AB2",
    LUCKY7B: "L7B",
    TEEN_PATTI: "TP1",
    DRAGON_TIGER: "DT20",
    DRAGON_TIGER_LION: "DTL20",
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
