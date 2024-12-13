import React, { useState, useEffect } from "react";
import { Simulation } from "./Simulation";
import axios from "axios";
import styles from "./css/SimulationWindow.module.css"; // Import the CSS module
import { proxyApiUrl } from "./helper/proxyApiUrl";

export const SimulationWindow = ({setPlayerACards, setPlayerBCards}) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [timer, setTimer] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [showSimulation, setShowSimulation] = useState(false);
  

  const handlePlayClick = async () => {
    try {
      setStatusMessage("Shuffling cards...");

      // API call to randomize cards
      const response = await axios.get(proxyApiUrl("/api/startGame"));

      if (response.status === 201) {
        setStatusMessage("Cards are shuffled!");
        setGameId(response.data.gameId);

        // Wait 3 seconds before starting the timer
        setTimeout(() => {
          setStatusMessage("");
          setTimer(3); // Start a 30-second timer
        }, 3000);
      } else {
        setStatusMessage("Failed to shuffle cards. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Error occurred while shuffling cards.");
      console.error(error);
    }
  };

  useEffect(() => {
    let countdownInterval;
    if (timer !== null) {
      if (timer > 0) {
        countdownInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else {
        clearInterval(countdownInterval);
        setTimer(null);
        setShowSimulation(true); // Show simulation after timer ends
      }
    }
    return () => clearInterval(countdownInterval); // Cleanup interval on unmount
  }, [timer]);

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <h4 className={styles.title}>Teen Patti</h4>

        {statusMessage && (
          <p className={styles.statusMessage}>{statusMessage}</p>
        )}

        {timer !== null && (
          <p className={styles.timerMessage}>
            Timer: {timer}s - Spectators, place your bets!
          </p>
        )}

        {showSimulation && (
          <Simulation
            game_Id={gameId}
            onFetchedPlayerA={setPlayerACards}
            onFetchedPlayerB={setPlayerBCards}
          />
        )}

        <button
          onClick={handlePlayClick}
          disabled={statusMessage !== "" || timer !== null}
          className={styles.playButton}
        >
          Play
        </button>
      </div>
    </div>
  );
};
