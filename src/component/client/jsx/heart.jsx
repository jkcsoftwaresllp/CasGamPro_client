import React, { useState, useEffect } from "react";
import { FavGameTile } from "./FavGameTile";
import { fetchFavoriteGames } from "../helper/favoriteGamesHelper"; // Import the helper function
import { likedIcon, hideIcon } from "../../../assets/assets";
import styles from "../style/Heart.module.css";

export const Heart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [favGames, setFavGames] = useState([]); // State for favorite games

  // Fetch favorite games on component mount
  useEffect(() => {
    const getFavGames = async () => {
      const fetchedGames = await fetchFavoriteGames();
      setFavGames(fetchedGames);
    };
    getFavGames();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle the modal visibility state
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      {/* Heart Button */}
      <div className={styles.heartButton} onClick={toggleModal}>
        {likedIcon}
      </div>

      {/* Modal for displaying favorite games */}
      <div className={`${styles.modal} ${isModalOpen ? styles.open : ""}`}>
        <div className={styles.modalContent}>
          <p className={styles.heading}>Liked Games</p>
          {hideIcon}

          <div className={styles.cardsContainer}>
            {favGames.length === 0 ? (
              <p>No favorite games found.</p>
            ) : (
              favGames.map((game, index) => (
                <FavGameTile
                  key={index}
                  label={game.name}
                  imgSrc={game.gameImg}
                  playedFor={game.totalPlayTime}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
