import React from "react";
import styles from "../style/SimulationSection.module.css";
import { Timer } from "../../timer/Timer";

export const SimulationSection = () => {
  return (
    <div className={styles.simulationSection}>
      {" "}
      Simulation Section
      {/* <div className={styles.timerContainer}>
        <Timer time={30} />
      </div> */}
    </div>
  );
};
