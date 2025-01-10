import React, { useEffect, useState } from "react";
import styles from "../style/GameInterface.module.css";
import { CardSection as Lucky7BCardSection } from "../../../lucky7B/jsx/CardSection";
import { CardSection as AndarBaharCardSection } from "../../../AndarBahar/jsx/CardSection";

export const GameInterface = ({ game, roundId = "A85745846" }) => {
  const [gameName, setGameName] = useState("");
  const [content, setContent] = useState(null);

  useEffect(() => {
    switch (game) {
      case "lucky7B":
        setContent(<Lucky7BCardSection />);
        setGameName("Lucky 7B");
        break;

      case "andarBahar":
        setContent(<AndarBaharCardSection />);
        setGameName("Andar Bahar");
        break;

      default:
        setGameName("Game not found");
        setContent(<div>Game not found</div>);
    }
  }, [game]);

  return (
    <div className={styles.gameInterface}>
      <div className={styles.header}>
        <div className={styles.gameDetail}>{gameName}</div>
        <div className={styles.gameRoundId}>{roundId}</div>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
