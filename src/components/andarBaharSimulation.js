import React, { useState, useEffect } from "react";
import "./andarBaharSim.module.css";
import { fetchDeck } from "./helper/fetchDeck";
import { drawBlindCard } from "./helper/drawBlindCard";
import { drawJokerCard } from "./helper/drawJokerCard";
import { dealCardsAuto } from "./helper/dealCardsAuto";

const AndarBaharSim = () => {
  const [deckId, setDeckId] = useState(null);
  const [jokerCard, setJokerCard] = useState(null);
  const [andarPile, setAndarPile] = useState([]);
  const [baharPile, setBaharPile] = useState([]);
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [blindCard, setBlindCard] = useState(null);
  const [deckVisible, setDeckVisible] = useState(true);

  useEffect(() => {
    fetchDeck(setDeckId, (id) =>
      drawBlindCard(id, setBlindCard, (id) =>
        drawJokerCard(id, setJokerCard, (id, joker) =>
          dealCardsAuto(
            id,
            joker,
            setAndarPile,
            setBaharPile,
            setWinner,
            setGameOver,
            setDeckVisible
          )
        )
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-center p-5 font-sans relative">
      {/* Host Section */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-5">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Game Host</h1>
        <p className="text-gray-600 text-sm italic">
          "Drawing cards for Andar and Bahar..."
        </p>
      </div>

      {/* Deck at Host */}
      {deckVisible && (
        <div className="deck-container absolute left-1/2 transform -translate-x-1/2 top-20">
          <img
            src="./deck.png"
            alt="Deck of Cards"
            className="deck w-24 h-32"
          />
        </div>
      )}

      {/* Blind Card */}
      {blindCard && (
        <div className="absolute right-20 top-32 animate-card-to-right">
          <img
            src="https://via.placeholder.com/100x150?text=Blind"
            alt="Blind Card"
            className="w-24 h-32 rounded-lg"
          />
        </div>
      )}

      {/* Joker Card */}
      {jokerCard && (
        <div className="absolute left-20 top-32 animate-card-to-left">
          <img
            src={jokerCard.image}
            alt={`Joker ${jokerCard.value}`}
            className="w-24 h-32"
          />
          <p className="text-gray-800">Joker</p>
        </div>
      )}

      {/* Card Piles with Line */}
      <div className="flex flex-col items-center mt-96">
        <div className="flex justify-center w-full relative">
          {/* Left Labels */}
          <div className="absolute left-10 top-1/2 transform -translate-y-1/2 flex flex-col items-start gap-20 text-lg font-bold text-gray-700">
            <p className="mb-20">Andar</p>
            <p>Bahar</p>
          </div>

          {/* Cards Section */}
          <div className="flex flex-col items-center">
            {/* Card Window (Fixed width, Horizontally Scrollable) */}
            <div className="relative overflow-x-auto w-[800px]  p-2 rounded-lg">
              {/* Andar Cards */}
              <div className="flex flex-col items-center mb-5">
                <div className="flex gap-1">
                  {andarPile.map((card, index) => (
                    <img
                      key={`andar-${index}`}
                      src={card.image}
                      alt={`${card.value} of ${card.suit}`}
                      className="card w-16 h-24"
                    />
                  ))}
                </div>
              </div>

              {/* Divider Line - Shown Dynamically */}
              {andarPile.length > 0 && (
                <hr className="w-full border-t-2 border-gray-600 mb-5 animate-fade-in" />
              )}

              {/* Bahar Cards */}
              <div className="flex flex-col items-center">
                <div className="flex gap-1">
                  {baharPile.map((card, index) => (
                    <img
                      key={`bahar-${index}`}
                      src={card.image}
                      alt={`${card.value} of ${card.suit}`}
                      className="card w-16 h-24"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Winner Announcement */}
      {gameOver && (
        <h2 className="text-xl font-bold mt-5 text-green-600">
          Winner: {winner} 🎉
        </h2>
      )}
    </div>
  );
};

export default AndarBaharSim;
