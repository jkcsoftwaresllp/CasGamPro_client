import React from "react";
import styles from "./css/MenuBar.module.css";

export const MenuBar = () => {
  return (
    <div className={styles.container}>
      <h5 className={styles.heading}>Teen Patti</h5>
      <button className={styles.button}>Menu</button>
    </div>
  );
};
