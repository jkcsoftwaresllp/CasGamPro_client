import React, { useState, useEffect } from "react";
import "./andarBaharSim.module.css";

const AndarBaharSim = () => {
  const [deckId, setDeckId] = useState(null);
  const [jokerCard, setJokerCard] = useState(null);
  const [andarPile, setAndarPile] = useState([]);
  const [baharPile, setBaharPile] = useState([]);
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchDeck();
  }, []);

  const fetchDeck = async () => {
    try {
      const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const data = await response.json();
      setDeckId(data.deck_id);
      drawJokerCard(data.deck_id);
    } catch (error) {
      console.error("Error fetching deck:", error);
    }
  };

  const drawJokerCard = async (deckId) => {
    try {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = await response.json();
      setJokerCard(data.cards[0]);
      dealCardsAutomatically(deckId, data.cards[0]);
    } catch (error) {
      console.error("Error drawing Joker card:", error);
    }
  };

  const dealCardsAutomatically = async (deckId, joker) => {
    let andar = [];
    let bahar = [];
    let gameFinished = false;

    const interval = setInterval(async () => {
      if (gameFinished || !deckId) {
        clearInterval(interval);
        return;
      }

      try {
        const response = await fetch(
          `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
        );
        const data = await response.json();

        if (data.cards.length > 0) {
          const [cardForAndar, cardForBahar] = data.cards;

          // Add to Andar pile
          andar.push(cardForAndar);
          setAndarPile([...andar]);

          if (cardForAndar.value === joker.value) {
            setWinner("Andar");
            setGameOver(true);
            clearInterval(interval);
            gameFinished = true;
            return;
          }

          setTimeout(() => {
            if (!gameFinished) {
              // Add to Bahar pile
              bahar.push(cardForBahar);
              setBaharPile([...bahar]);

              if (cardForBahar.value === joker.value) {
                setWinner("Bahar");
                setGameOver(true);
                clearInterval(interval);
                gameFinished = true;
              }
            }
          }, 500);
        } else {
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error dealing cards:", error);
        clearInterval(interval);
      }
    }, 1200);
  };

  return (
    <div className="game-container text-center p-5 font-sans">
      <h1 className="text-2xl font-bold mb-5">Andar Bahar Simulation</h1>
      {jokerCard && (
        <>
          <div className="joker-card-container mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Joker Card:
            </h2>
            <img
              src={jokerCard.image}
              alt={`Joker ${jokerCard.value}`}
              className="joker-card mx-auto w-32 h-48"
            />
          </div>
          <div className="card-piles flex justify-around mt-10">
            {/* Andar Pile */}
            <div className="andar-pile">
              <h3 className="text-lg font-bold mb-4">A - Andar</h3>
              <div className="cards flex flex-wrap justify-center gap-3">
                {andarPile.map((card, index) => (
                  <img
                    key={`andar-${index}`}
                    src={card.image}
                    alt={`${card.value} of ${card.suit}`}
                    className="card w-16 h-24 mx-1"
                  />
                ))}
              </div>
            </div>

            {/* Bahar Pile */}
            <div className="bahar-pile">
              <h3 className="text-lg font-bold mb-4">B - Bahar</h3>
              <div className="cards flex flex-wrap justify-center gap-3">
                {baharPile.map((card, index) => (
                  <img
                    key={`bahar-${index}`}
                    src={card.image}
                    alt={`${card.value} of ${card.suit}`}
                    className="card w-16 h-24 mx-1"
                  />
                ))}
              </div>
            </div>
          </div>

          {gameOver && (
            <h2 className="winner text-xl font-bold mt-5">
              Winner: {winner} 🎉
            </h2>
          )}
        </>
      )}
    </div>
  );
};

export default AndarBaharSim;
