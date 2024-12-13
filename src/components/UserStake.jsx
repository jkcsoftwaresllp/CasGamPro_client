import React, { useState } from "react";
import axios from "axios";
import styles from "./css/UserStake.module.css"; // Import the CSS module
import { proxyApiUrl } from "./helper/proxyApiUrl"; // Assuming proxyApiUrl is available for API calls

export const UserStake = () => {
  const [stakes, setStakes] = useState([]); // State to hold stakes data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  // Function to fetch stake data
  const fetchStakes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(proxyApiUrl("/api/getStakes")); // Fetch data from API
      const filteredStakes = response.data.map((stake) => ({
        player: stake.player,
        amount: stake.amount,
      })); // Process response to get only player name and amount
      setStakes(filteredStakes); // Update stakes in state
    } catch (err) {
      setError("Failed to fetch stakes. Please try again."); // Handle errors
      console.error("Error fetching stakes:", err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className={styles.container}>
      <h6 className={styles.heading}>Current Stake</h6>
      <button onClick={fetchStakes} className={styles.refreshButton}>
        Refresh
      </button>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.stakeList}>
        {stakes.length > 0 ? (
          stakes.map((stake, index) => (
            <div key={index} className={styles.stakeItem}>
              <span className={styles.player}>{stake.player}</span>
              <span className={styles.amount}>${stake.amount}</span>
            </div>
          ))
        ) : (
          <p className={styles.noData}>
            No stakes available. Click Refresh to load.
          </p>
        )}
      </div>
    </div>
  );
};
