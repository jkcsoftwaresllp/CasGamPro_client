import React from "react";
import styles from "../style/Winner.module.css";

export const Winner = ({ name }) => {
  return <div className={styles.winner}>{name}</div>;
};
