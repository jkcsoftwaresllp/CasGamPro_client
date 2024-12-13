import React from "react";
import styles from "./css/PlayerButton.module.css";

export const PlayerButton = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>Player-1 (1.96)</button>
      <button className={styles.button}>Player-2 (1.96)</button>
    </div>
  );
};
