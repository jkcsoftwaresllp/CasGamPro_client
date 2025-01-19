import React, { useState } from "react";
import { FavGameTile } from "./FavGameTile";
import close from "../images/close.svg";
import styles from "../style/Heart.module.css";
import fav from "../images/fav.svg";

export const Heart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [favGames, setFavGames] = useState([
    {
      label: "FIFA 22",
      imgSrc:
        "https://th.bing.com/th/id/OIP.8Rbkr6V5D_F2p69ikQQGcQHaEK?rs=1&pid=ImgDetMain",
      playedFor: "10 hours",
    },
    {
      label: "Call of Duty: Modern Warfare",
      imgSrc:
        "https://assets1.ignimgs.com/2019/05/30/call-of-duty-modern-warfare---button-01-1559237615728.jpg",
      playedFor: "25 hours",
    },
    {
      label: "Minecraft",
      imgSrc:
        "https://image.api.playstation.com/vulcan/img/cfn/11307x4B5WLoVoIUtdewG4uJ_YuDRTwBxQy0qP8ylgazLLc01PBxbsFG1pGOWmqhZsxnNkrU3GXbdXIowBAstzlrhtQ4LCI4.png",
      playedFor: "100 hours",
    },
  ]);

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
        <img src={fav} />
      </div>

      {/* Modal for displaying favorite games */}
      <div className={`${styles.modal} ${isModalOpen ? styles.open : ""}`}>
        <div className={styles.modalContent}>
          <p className={styles.heading}>Liked Games</p>
          <img
            className={styles.closeButton}
            onClick={closeModal}
            src={close}
            alt="close"
          />

          <div className={styles.cardsContainer}>
            {favGames.map((game, index) => (
              <FavGameTile
                key={index}
                label={game.label}
                imgSrc={game.imgSrc}
                playedFor={game.playedFor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
