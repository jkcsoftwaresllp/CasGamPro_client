import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Main/Header"; // Header component
import Routing from "./Routing"; // Import the Routing component
import { PlayerLabel } from "./components/game/common/jsx/PlayerLabel";
import { BetProfit } from "./components/game/common/jsx/BetProfit";
import { BetWithText } from "./components/game/common/jsx/BetWithText";
import { BetWithColor } from "./components/game/common/jsx/BetWithColor";

function App() {
  return (
    <Router>
      {/* Header will be visible on all pages */}
      <Header />
      {/* <PlayerLabel betPlaced={"0.0"} label={"Player A"} on /> <br /> */}
      <BetProfit
        betProfit={"1.96"}
        onClick={(value) => {
          console.log(value);
        }}
        isLock={true}
      />
      <BetWithColor
        color={"red"}
        betAmount={"0.0"}
        betProfit={"1.75"}
        isLock={false}
        onClick={(value) => {
          console.log(value);
        }}
      />
    </Router>
  );
}

export default App;
