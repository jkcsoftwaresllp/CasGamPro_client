import BetInPair from "../../../commonGameComponent/BetSection/jsx/BetInPair";
import styles from "../style/BetHeader.module.css";

const BetHeaderLeft = () => {
  const handleClick = (value) => {
    console.log("Clicked with value:", value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.betInRectangle}>
        <BetInPair
          label="Pair"
          betProfit="0"
          betAmount="100"
          onClick={handleClick}
          isLock={false}
        />
      </div>
    </div>
  );
};

export default BetHeaderLeft;
