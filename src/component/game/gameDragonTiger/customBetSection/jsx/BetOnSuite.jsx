import React from "react";
import BetWithText from "../../../commonGameComponent/BetSection/jsx/BetWithText";
import BetWithColor from "../../../commonGameComponent/BetSection/jsx/BetWithColor";
import styles from "../style/LowerBetSection.module.css";

const BetOnSuite = () => {
  return (
    <div className={styles.betOnSuiteContainer}>
      <BetWithText label="Even" betProfit={0} betAmount={0} />
      <BetWithText label="Odd" betProfit={0} betAmount={0} />
      <BetWithColor color="black" betProfit={0} betAmount={0} />
      <BetWithColor color="red" betProfit={0} betAmount={0} />
    </div>
  );
};

export default BetOnSuite;
