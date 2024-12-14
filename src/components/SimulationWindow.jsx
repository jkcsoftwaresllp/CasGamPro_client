import React, { useState, useEffect } from "react";
import { Simulation } from "./Simulation";
import axios from "axios";
import styles from "./css/SimulationWindow.module.css"; // Import the CSS module
import { proxyApiUrl } from "./helper/proxyApiUrl";

export const SimulationWindow = ({
  setPlayerACards,
  setPlayerBCards,
  isAcceptingBets,
}) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [timer, setTimer] = useState(null);
  const [gameId, setGameId] = useState(null); // Store the current gameId
  const [showSimulation, setShowSimulation] = useState(false);

  useEffect(() => {
    // Automatically start the game when the component mounts
    startGame();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const startGame = async () => {
    try {
      setStatusMessage("Shuffling cards...");

      // API call to randomize cards
      const response = await axios.get(proxyApiUrl("/api/startGame"));

      if (response.status === 201) {
        setStatusMessage("Cards are shuffled!");
        setGameId(response.data.gameId); // Set the new gameId

        // Wait 3 seconds before starting the timer
        setTimeout(() => {
          setStatusMessage("");
          setTimer(15); // Start the timer for 3 seconds (or any duration you prefer)
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
        isAcceptingBets(false); // Notify parent that the 30 seconds are over

        // Call the API after 30 seconds
        axios
          .post(proxyApiUrl("/api/stopAcceptBets"), { gameId })
          .then(() => {
            setShowSimulation(true); // Show simulation after timer ends
          })
          .catch((error) => {
            console.error("Error accepting bets:", error);
          });
      }
    }
    return () => clearInterval(countdownInterval); // Cleanup interval on unmount
  }, [timer, gameId, isAcceptingBets]);

  // Function to handle the reset and automatic restart of the game
  const resetAndStartNewGame = () => {
    // Reset current game state
    setShowSimulation(false);
    setPlayerACards([]);
    setPlayerBCards([]);
    isAcceptingBets(true);
    // Start a new game
    startGame();
  };

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
            game_Id={gameId} // Pass the current gameId
            onFetchedPlayerA={setPlayerACards}
            onFetchedPlayerB={setPlayerBCards}
            onGameComplete={resetAndStartNewGame} // Automatically start a new game after this one ends
          />
        )}
      </div>
    </div>
  );
};
