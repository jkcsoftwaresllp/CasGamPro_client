import { BetOnCard } from "../game/commonGameComponent/betSection/jsx/BetOnCard";

const Test = () => {
  return (
    <div style={{ backgroundColor: "#fff", padding: "10px" }}>
      {/* <div> */}
      <BetOnCard
        label={"A"}
        betAmount={"0.0"}
        betProfit={"1.75"}
        onClick={(value) => {
          console.log(value);
        }}
        isLock={false}
      />
    </div>
  );
};

export default Test;
