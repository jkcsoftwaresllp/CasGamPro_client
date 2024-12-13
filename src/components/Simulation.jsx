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
  const [isDrawing, setIsDrawing] = useState(true); // Is the game drawing cards
  const [cardIndex, setCardIndex] = useState(0); // To track the number of fetched cards

  useEffect(() => {
    // Fetching cards every 3 seconds until we have all 7 cards
    const interval = setInterval(() => {
      if (cardIndex < 7) {
        fetchCardFromAPI(cardIndex);
      } else {
        clearInterval(interval); // Stop fetching when we have all 7 cards
        setIsDrawing(false); // Stop drawing cards
      }
    }, 3000); // Fetch new card every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [cardIndex]); // The effect will run when `cardIndex` changes

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

  const updateCardsState = (card, index) => {
    // Update the state correctly based on the current card index
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

  return (
    <div className={styles.container}>
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
    </div>
  );
};
