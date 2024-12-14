import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/Simulation.module.css"; // Assuming we have styles
import { proxyApiUrl } from "./helper/proxyApiUrl";
import { Card as CardComponent } from "./Card";
import { CardRender } from "./CardRender";

export const Simulation = ({ onFetchedPlayerA, onFetchedPlayerB, game_Id }) => {
  // State to manage cards and timer
  const [playerACards, setPlayerACards] = useState([]); // Cards for Player A
  const [playerBCards, setPlayerBCards] = useState([]); // Cards for Player B
  const [blindCard, setBlindCard] = useState(null); // Blind card (not revealed)
  const [cardIndex, setCardIndex] = useState(0); // To track the number of fetched cards
  const [gameResult, setGameResult] = useState(null); // Store the result of the game
  const [showResult, setShowResult] = useState(false); // Store the result of the game

  useEffect(() => {
    // Fetching cards every 3 seconds until we have all 7 cards
    const interval = setInterval(() => {
      if (cardIndex < 7) {
        fetchCardFromAPI(cardIndex);
      } else {
        clearInterval(interval); // Stop fetching when we have all 7 cards
        fetchGameResult(); // Fetch game result when all cards are drawn
      }
    }, 3000); // Fetch new card every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [cardIndex]); // The effect will run when `cardIndex` changes

  // Function to fetch a card from the API
  const fetchCardFromAPI = async (index) => {
    try {
      const response = await axios.get(
        proxyApiUrl(`/api/getTopCard?game_id=${game_Id}`)
      );
      const card = response.data.card; // Get the card details
      updateCardsState(card, index);
    } catch (error) {
      console.error("Error fetching card:", error);
    }
  };

  // Function to update the state of the cards
  const updateCardsState = (card, index) => {
    if (index === 0) {
      setBlindCard(card); // Set the first card as the blind card
    } else {
      // Distribute remaining cards between Player A and Player B
      if (index % 2 === 1) {
        setPlayerACards((prevCards) => [...prevCards, card]);
        onFetchedPlayerA((prevCards) => [...prevCards, card]);
      } else {
        setPlayerBCards((prevCards) => [...prevCards, card]);
        onFetchedPlayerB((prevCards) => [...prevCards, card]);
      }
    }

    // Increment card index and propagate updated state
    setCardIndex((prevIndex) => prevIndex + 1);
  };

  // Function to fetch the game result
  const fetchGameResult = async () => {
    try {
      const response = await axios.get(
        proxyApiUrl(`/api/getResult?gameId=${game_Id}`)
      );
      setGameResult(
        response.data.winner === "Player-1" ? "Player A" : "Player B"
      ); // Set the result (winner)
      setShowResult(true);
      showGameResultFor3Seconds(); // Show the result for 3 seconds
    } catch (error) {
      console.error("Error fetching result:", error);
    }
  };

  // Function to display the result for 3 seconds
  const showGameResultFor3Seconds = () => {
    setTimeout(() => {
      setGameResult(null); // Reset the result after 3 seconds
      resetGame(); // Reset the game state for the next game
    }, 3000); // Show result for 3 seconds
  };

  // Function to reset the game state for the next game
  const resetGame = () => {
    onFetchedPlayerA([]);
    onFetchedPlayerB([]);
    setPlayerACards([]);
    setPlayerBCards([]);
    setBlindCard(null);
    setCardIndex(0);
    setShowResult(false);
  };


  return (
    <div className={styles.container}>
      {showResult ? (
        <div className={styles.winnerSection}>
          <div
            className={`${styles.player} ${
              styles[gameResult === "Player A" ? "winner" : ""]
            }`}
          >
            Player A
          </div>
          <div
            className={`${styles.player} ${
              styles[gameResult === "Player A" ? "" : "winner"]
            }`}
          >
            Player B
          </div>
        </div>
      ) : (
        <>
          <CardRender cards={playerACards} playerName={"Player A"} />
          <CardRender cards={playerBCards} playerName={"Player B"} />

          {/* Blind card */}
          {blindCard && (
            <div className={styles.blind}>
              <CardComponent
                code={blindCard}
                isShow={false}
                setResult={() => {}}
              ></CardComponent>
            </div>
          )}
        </>
      )}
    </div>
  );
};
