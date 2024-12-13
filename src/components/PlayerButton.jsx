import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/PlayerButton.module.css";
import { proxyApiUrl } from "./helper/proxyApiUrl";

export const PlayerButton = ({ betAmount }) => {
  const [msg, setMsg] = useState(null);

  const placeBet = async (player) => {
    try {
      const payload = {
        spectators: "Spectator_Name",
        player,
        amount: betAmount,
      };

      const response = await axios.post(proxyApiUrl("/api/setBet"), payload);
      setMsg(`Bet placed successfully on ${player}! of ${betAmount}`);
    } catch (error) {
      setMsg("Error placing bet. Please try again.");
      console.error("Error placing bet:", error);
    }
  };

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg(null);
      }, 5000); // Reset `msg` to null after 5 seconds

      return () => clearTimeout(timer); // Cleanup timeout on component unmount or `msg` change
    }
  }, [msg]);

  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.button}
          disabled={betAmount === 0}
          onClick={() => placeBet("Player-1")}
        >
          Player-1 (1.96)
        </button>
        <button
          className={styles.button}
          disabled={betAmount === 0}
          onClick={() => placeBet("Player-2")}
        >
          Player-2 (1.96)
        </button>
      </div>
      {msg && <div className={styles.msg}>{msg}</div>}
    </>
  );
};
