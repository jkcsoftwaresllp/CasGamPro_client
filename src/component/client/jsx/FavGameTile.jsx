import React from "react";
import styles from "../style/FavGame.module.css"; // Importing the styles from the CSS module

export const FavGameTile = ({ label, imgSrc, playedFor }) => {
  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <span className={styles.playedFor}>{playedFor}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
};
