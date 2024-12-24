import React from "react";
import styles from "../styles/SideTab.module.css";

export const SideTab = ({ onClick, title }) => {
  return (
    <div className={styles.sideTab} onClick={onClick}>
      {title}
    </div>
  );
};
