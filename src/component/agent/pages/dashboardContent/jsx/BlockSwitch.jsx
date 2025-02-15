import React, { useEffect, useState } from "react";
import styles from "../../styles/BlockSwitch.module.css";

export const BlockSwitch = ({ label, onChange, id, level }) => {
  const [isChecked, setIsChecked] = useState();
  useEffect(() => {
    setIsChecked(level === "LEVEL_1");
  }, [level]);

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
          onChange={(e) => onChange(isChecked ? "NONE" : "LEVEL_1")}
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
