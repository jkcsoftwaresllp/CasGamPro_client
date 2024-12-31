import React from "react";
import style from "../style/WinnerHistory.module.css";
import Cancel from "../images/cancel.svg";

const WinnerDetail = ({ roundId, gameId, winner, toggleDetails }) => {
  // Sample cards (could be dynamically generated as needed)
  const cards = [
    { id: 1, value: "A", suit: "♥" },
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
    <div className={style.SmallWindow}>
      <div className={style.TopLeftDetails}>
        <p>Round ID: {roundId}</p>
        <p>Game ID: {gameId}</p>
      </div>
      <br />
      <br />
      <p>
        <strong>Winner:</strong> {winner}
      </p>
      <p>Winner Cards:</p>
      <div className={style.CardScrollContainer}>
        {cards.map((card) => (
          <div key={card.id} className={style.Card}>
            <div className={style.CardContent}>
              <p>{card.value}</p>
              <p>{card.suit}</p>
            </div>
          </div>
        ))}
      </div>
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
  );
};

export default WinnerDetail;
