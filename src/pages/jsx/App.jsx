import { BrowserRouter as Router } from "react-router-dom";
import style from "../styles/App.module.css";
import { Header } from "../../component/common/Header"; // Header component
import { Routing } from "./Routing"; // Import the Routing component

function App() {
  return (
    <div className={style.app}>
      <Router>
        <Header />
        <Routing />
      </Router>
    </div>
  );
}

export default App;
