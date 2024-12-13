import React from "react";
import styles from "./css/CustomBetInput.module.css";

export const CustomBetInput = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.inputGroup}>
          <button className={styles.button} id="decrement">
            -
          </button>
          <input
            type="number"
            id="custom-number-input"
            className={styles.input}
            value="0"
            min="0"
            readOnly
          />
          <button className={styles.button} id="increment">
            +
          </button>
        </div>
      </div>
    </div>
  );
};
