import { Routes, Route } from "react-router-dom";
import style from "../styles/Routing.module.css";

import { Home } from "./Home";
import { LoginPage } from "../../component/agent/pages/dashboardContent/LoginPage";
import { AgentWindow } from "../../component/agent/main/jsx/AgentWindow";
import { Test } from "../../component/test/test";
import { Game } from "../../component/game/common/layout/jsx/Game";
import { ProtectedRoutes } from "./ProtectedRoutes"; // Import the ProtectedRoute
import { ErrorPage } from "./Error"; // Import the ErrorPage

export const Routing = () => {
  return (
    <div className={style.routingWrapper}>
      <div className={style.routing}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route
            path="*"
            element={
              <ErrorPage
                errorCode="ERR404"
                errorMessage="The page you are looking for does not exist."
              />
            }
          />

          {/* Protected routes */}
          <Route
            path="/agent/*"
            element={
              <ProtectedRoutes allowedRoles={["AGENT"]}>
                <AgentWindow />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/game/*"
            element={
              <ProtectedRoutes allowedRoles={["CLIENT"]}>
                <Game />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </div>
  );
};
