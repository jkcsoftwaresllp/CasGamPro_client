import React from "react";
import styles from "../../styles/BlockSwitch.module.css";

export const BlockSwitch = ({ label, isChecked, setIsChecked, id }) => {
  return (
    <div className={styles.checkboxWrapper}>
      <p className={styles.para}>{label}</p>
      <div className={styles.switchArea}>
        {" "}
        <input
          type="checkbox"
          id={id}
          className={styles.switch}
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor={id}>
          <span className={styles.switchText}>Status </span>
          <span className={styles.switchToggleText}>
            <span
              className={
                isChecked ? styles.switchChecked : styles.switchUnchecked
              }
            >
              {isChecked ? "Blocked" : "Active"}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
};
