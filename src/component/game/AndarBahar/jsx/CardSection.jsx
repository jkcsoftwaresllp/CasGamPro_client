import React, { useEffect, useState } from "react";
import styles from "../style/CardSection.module.css";
import { CardSection as ABCardSection } from "../../common/cardSection/jsx/CardSection";
import {
  connectSocket,
  disconnectSocket,
  subscribeToEvent,
  emitEvent,
} from "../../helper/socketService";
import { GAME_TYPES } from "../../helper/gameTypes";

export const CardSection = () => {
  const [totalCards, setTotalCards] = useState([]);

  useEffect(() => {
    const socket = connectSocket("game");

    socket.on("connect", () => {
      emitEvent("joinGameType", GAME_TYPES.ANDAR_BAHAR);
    });

    subscribeToEvent("gameStateUpdate", (updatedState) => {

      if (updatedState) {
        const { andarCards, baharCards } = updatedState;
        const maxLength = Math.max(andarCards.length, baharCards.length);
        const combinedCards = [];

        for (let i = 0; i < maxLength; i++) {
          if (i < baharCards.length && baharCards[i] !== null) {
            combinedCards.push(baharCards[i]);
          }
          if (i < andarCards.length && andarCards[i] !== null) {
            combinedCards.push(andarCards[i]);
          }
        }

        setTotalCards(combinedCards);
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className={styles.cardSection}>
      <ABCardSection playerA="Andar" playerB="Bahar" cards={totalCards} />
    </div>
  );
};
