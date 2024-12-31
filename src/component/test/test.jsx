import { BetOnCard } from "../game/commonGameComponent/BetSection/jsx/BetOnCard";

const Test = () => {
  return (
    // <div style={{backgroundColor: '#fff', padding: '10px'}}>
    <div>
      <BetOnCard
        label={"A"}
        betAmount={"0.0"}
        betProfit={"1.75"}
        onClick={() => {}}
        isLock={false}
      />
    </div>
  );
};

export default Test;
