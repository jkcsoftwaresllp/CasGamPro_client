import { BetWithColor } from "../game/commonGameComponent/BetSection/jsx/BetWithColor";
import { BetWithText } from "../game/commonGameComponent/BetSection/jsx/BetWithText";

const Test = () => {
  return (
    // <div style={{backgroundColor: '#fff'}}>
    <div>
      <BetWithColor
        color={"red"}
        betAmount={"0.0"}
        betProfit={"1.75"}
        onClick={() => {}}
        isLock={false}
      />
      <BetWithText
        label={"Player A"}
        betAmount={"0.0"}
        betProfit={"1.75"}
        onClick={() => {}}
        isLock={false}
      />
    </div>
  );
};

export default Test;
