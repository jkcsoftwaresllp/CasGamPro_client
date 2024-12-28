import { Routes, Route } from "react-router-dom";
import style from "../styles/Home.module.css";
// Import page components
import LoginPage from "../../component/agent/pages/dashboardContent/LoginPage";

import Home from "./Home";
import AgentWindow from "../../component/agent/main/jsx/AgentWindow";
import Test from "../../component/game/commonGameComponent/WinnerHistory/WinnerHistory";
const Routing = () => {
  return (
    <div className={style.routing}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/agent/*" element={<AgentWindow />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};

export default Routing;
