import './App.css';
import { MenuBar } from './components/MenuBar';
import { CardDetails } from './components/CardDetails';
import { SimulationWindow } from './components/SimulationWindow';
import { BetHistoryPannel } from './components/BetHistoryPanel';
import { CustomBetInput } from './components/CustomBetInput';
import { CoinsUI } from './components/CoinsUI';
import { PlayerButton } from './components/PlayerButton';
import { Simulation } from './components/Simulation';

function App() {
  return (
    <>
    <div className="container-fluid" style={{ marginBottom: '25px' }}>
    <MenuBar/>
    <div class="row mt-3 vsh">
    <CardDetails/>
    <SimulationWindow/>
    <BetHistoryPannel/>
    <CustomBetInput/>
    <CoinsUI/>
    <PlayerButton/>
    </div>
    </div>
    </>
  );
}

export default App;
