import React from "react";
import style from "../style/Window.module.css";
import Cancel from "../images/cancel.svg";
import { DetailCards } from "./DetailCards";
import { Button } from "../../../../common/Button";

export const WinnerDetail = ({ roundId, gameId, winner, toggleDetails }) => {
  const cards = [
    { id: 1, value: "A", suit: "♣" },
    { id: 2, value: "2", suit: "♦" },
    { id: 3, value: "3", suit: "♣" },
    { id: 4, value: "4", suit: "♠" },
    { id: 5, value: "5", suit: "♥" },
    { id: 6, value: "6", suit: "♦" },
    { id: 7, value: "7", suit: "♣" },
    { id: 8, value: "8", suit: "♠" },
    { id: 9, value: "9", suit: "♥" },
    { id: 10, value: "10", suit: "♦" },
  ];

  return (
    <div className={style.Overlay}>
      <div className={style.SmallWindow}>
        <div className={style.TopRightDetails}>
          <p>Round ID: {roundId}</p>
          <p>Game ID: {gameId}</p>
        </div>
        <br />
        <br />
        <p className={style.TopLeftDetails}>
          <strong>Winner:</strong> {winner}
        </p>

        <DetailCards cards={cards} />
        <br />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDetails();
          }}
          className={style.CancelIconButton}
          aria-label="Close details"
        >
          <img src={Cancel} alt="Cancel" />
        </button>
      </div>
    </div>
  );
};

