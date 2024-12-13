import "./App.css";
import { MenuBar } from "./components/MenuBar";
import { BetHistoryPannel } from "./components/BetHistoryPanel";
import { CustomBetInput } from "./components/CustomBetInput";
import { CoinsUI } from "./components/CoinsUI";
import { PlayerButton } from "./components/PlayerButton";
import { SimulationSection } from "./components/SimulationSection";

function App() {
  return (
    <>
      <div className="container-fluid" style={{ marginBottom: "25px" }}>
        <MenuBar />
        <div className="">
          <SimulationSection/>
          <BetHistoryPannel />
          <CustomBetInput />
          <CoinsUI />
          <PlayerButton />
        </div>
      </div>
    </>
  );
}

export default App;
