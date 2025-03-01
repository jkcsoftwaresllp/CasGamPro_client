import React from "react";
import styles from "../style/GameInterface.module.css";
import { CardSection as Lucky7ACardSection } from "../../../lucky7A/jsx/CardSection";
import { CardSection as Lucky7BCardSection } from "../../../lucky7B/jsx/CardSection";
import { CardSection as AndarBaharCardSection } from "../../../AndarBahar2/jsx/CardSection";
import { CardSection as TeenPattiT20CardSection } from "../../../teenPattiT20/jsx/CardSection";
import { CardSection as DragonTigerCardSection } from "../../../dragonTiger/jsx/CardSection";
import { CardSection as DragonTigerBCardSection } from "../../../dragonTigerB/jsx/CardSection";
import { CardSection as DragonTigerLionCardSection } from "../../../dragonTigerLion/jsx/CardSection";
import { gameNameMap } from "../../../helper/gameTypes";
import { useState } from "react";
import { hideIcon, showIcon } from "../../../../../assets/assets";
import { motion } from "framer-motion";

export const GameInterface = ({
  game,
  roundId = "A85745846",
  cards,
  status,
}) => {
  const betSectionMap = {
    lucky7A: Lucky7ACardSection,
    lucky7B: Lucky7BCardSection,
    andarBahar1: AndarBaharCardSection,
    andarBahar2: AndarBaharCardSection,
    teenPattiT20: TeenPattiT20CardSection,
    dragonTiger: DragonTigerCardSection,
    dragonTigerB: DragonTigerBCardSection,
    dragonTigerLion: DragonTigerLionCardSection,
  };

  const SelectedBetSection = betSectionMap[game] || null;
  const gameName = gameNameMap[game] || null;
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={styles.gameInterface}>
      <div className={styles.header}>
        <div className={styles.gameDetail}>{gameName ? gameName : "Error"}</div>
        <div className={styles.gameRoundId}>{roundId}</div>
      </div>

      {/* Toggle Button with Icons */}
      <div
        onClick={() => setIsVisible((prev) => !prev)}
        className={styles.toggleButton}
      >
        {isVisible ? hideIcon : showIcon}
      </div>

      {/* Casino Cards Section with Smooth Fade Animation */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, height: isVisible ? "auto" : 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isVisible && status !== "betting" && SelectedBetSection ? (
          <SelectedBetSection cards={cards} />
        ) : null}
      </motion.div>
    </div>
  );
};
