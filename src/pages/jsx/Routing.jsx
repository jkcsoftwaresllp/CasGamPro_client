import { Routes, Route } from "react-router-dom";
import style from "../styles/Routing.module.css";

import { Home } from "./Home";
import { LoginPage } from "../../component/agent/pages/dashboardContent/LoginPage";
import { AgentWindow } from "../../component/agent/main/jsx/AgentWindow";
import { Test } from "../../component/test/test";
import { GameLayout } from "../../component/game/common/gameLayout/GameLayout";

export const Routing = () => {
  return (
    <div className={style.routing}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/agent/*" element={<AgentWindow />} />
        <Route path="/test" element={<Test />} />
        <Route path="/game" element={<GameLayout />} />
      </Routes>
    </div>
  );
};
