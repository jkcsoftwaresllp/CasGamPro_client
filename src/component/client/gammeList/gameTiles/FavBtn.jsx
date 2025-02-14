// FavBtn.js
import React, { useState } from "react";
import unlikedHeart from "./images/unliked.svg"; // Unliked heart
import likedHeart from "./images/liked.svg"; // Liked heart
import styles from "./style/FavBtn.module.css";
import { apiCall } from "../../../common/apiCall";


export const FavBtn = ({ className, gameId }) => {
  const [isFavorite, setIsFavorite] = useState(false);


  const handleClick = async (e) => {
    e.stopPropagation();
    const response = await apiCall("/auth-api/client/addGameFavorite", "POST", {
      gameId,
    });
    setIsFavorite(!isFavorite);

    console.log(response);
  };

  return (
    <div className={`${styles.favBtn} ${className}`} onClick={handleClick}>
      <img
        src={isFavorite ? likedHeart : unlikedHeart}
        title={isFavorite ? "Marked as favorite" : "Mark as favorite"}
        className={styles.icon}
      />
    </div>
  );
};
