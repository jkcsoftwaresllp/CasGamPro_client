import React from "react";
import styles from "./css/Card.module.css";
import gameImage from "./assets/game.png";
import { clubIcon, diamondIcon, heartIcon, spadeIcon } from "./assets/icons.js";

export const Card = ({ code, setResult, isShow }) => {
  const suitName = code[0];
  const cardName = code.slice(1);

  let cardIcon;

  switch (suitName) {
    case "H":
      cardIcon = heartIcon;
      break;
    case "S":
      cardIcon = spadeIcon;
      break;
    case "C":
      cardIcon = clubIcon;
      break;
    case "D":
      cardIcon = diamondIcon;
      break;
    default:
      cardIcon = null;
  }

  const cssVariable = {
    "--suitColor":
      suitName === "H" || suitName === "D"
        ? "#ff5969"
        : "#404040",
    "--isFront": isShow ? "0deg" : "180deg",
  };

  return (
    <div
      className={styles.cardContainer}
      style={cssVariable}
      onClick={() => setResult(code)}
    >
      <div className={styles.card}>
        <div className={styles.cardFront}>
          <div className={styles.content}>
            <p>{cardName}</p>
            <p>{cardIcon}</p>
          </div>
        </div>
        <div className={styles.cardBack}>
          <img src={gameImage} alt="" />
        </div>
      </div>
    </div>
  );
};
