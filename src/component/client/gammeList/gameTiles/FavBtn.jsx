// FavBtn.js
import React, { useState } from "react";
import unlikedHeart from "./images/unliked.svg"; // Unliked heart
import likedHeart from "./images/liked.svg"; // Liked heart
import styles from "./style/FavBtn.module.css";

export const FavBtn = ({ className }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
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
