import { BetWithColor } from "../game/commonGameComponent/BetSection/jsx/BetWithColor";

const Test = () => {
  return (
    <div>
      <BetWithColor
        color={"red"}
        betAmount={"0.0"}
        betProfit={"1.76"}
        onClick={(value) => {
          console.log("click ", value );
        }}
      />
      <BetWithColor
        color={"black"}
        betAmount={"0.0"}
        betProfit={"1.76"}
        onClick={(value) => {
          console.log("click ", value );
        }}
      />
      <BetWithColor
        color={"red"}
        betAmount={"0.0"}
        betProfit={"1.76"}
        onClick={(value) => {
          console.log("click ", value );
        }}
        isLock={true}
      />
    </div>
  );
};

export default Test;
