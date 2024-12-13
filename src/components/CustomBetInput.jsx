import React, { useState } from "react";
import styles from "./css/CustomBetInput.module.css";

export const CustomBetInput = ({ setResult, betValue }) => {

  const handleIncrement = () => {
    const newValue = betValue + 20;
    setResult(newValue); // Update the parent component
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, betValue - 20); // Ensure value doesn't go below 0
    setResult(newValue); // Update the parent component
  };

  const handleInputChange = (event) => {
    let inputValue = parseInt(event.target.value, 10);
    if (isNaN(inputValue) || inputValue < 0) {
      inputValue = 0; // Reset to 0 if invalid or negative
    }
    setResult(inputValue); // Update the parent component
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <button
          className={styles.button}
          id="decrement"
          onClick={handleDecrement}
          disabled={betValue <= 0} // Disable if the value is 0
        >
          -
        </button>
        <input
          type="number"
          id="custom-number-input"
          className={styles.input}
          value={betValue}
          onChange={handleInputChange} // Allow direct editing of the input
        />
        <button
          className={styles.button}
          id="increment"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};
