import React from "react";
import styles from "./style/BetBody.module.css";

const CustomButton = ({ label, onClick, backgroundColor, textColor }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
    >
      {label}
    </button>
  );
};

export default CustomButton;
