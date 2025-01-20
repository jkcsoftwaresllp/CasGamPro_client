import { Routes, Route } from "react-router-dom";
import style from "../styles/Routing.module.css";

import { Home } from "./Home";
import { LoginPage } from "../../component/agent/pages/dashboardContent/LoginPage";
import { AgentWindow } from "../../component/agent/main/jsx/AgentWindow";
import { Test } from "../../component/test/test";
import { Game } from "../../component/game/common/layout/jsx/Game";
import { GameList } from "../../component/game/pages/GameList";
import { LayoutDash } from "../../layoutDash/jsx/LayoutDash";
import { Rules } from "../../layoutDash/pages/Rules";
import { HomeDash } from "../../layoutDash/pages/HomeDash";
import { Schedule } from "../../layoutDash/pages/Schedule";
import { ErrorPage } from "./Error";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const Routing = () => {
  return (
    <div className={style.routingWrapper}>
      <div className={style.routing}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />

          {/* Protected routes */}
          <Route
            path="/gameList"
            element={
              <ProtectedRoutes allowedRoles={["player", "agent", "admin"]}>
                <GameList />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dash/*"
            element={
              <ProtectedRoutes allowedRoles={["player", "agent", "admin"]}>
                <LayoutDash />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Rules />} />
            <Route path="home" element={<HomeDash />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>

          <Route
            path="/agent/*"
            element={
              <ProtectedRoutes allowedRoles={["agent", "admin"]}>
                <AgentWindow />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/game"
            element={
              <ProtectedRoutes allowedRoles={["player", "agent", "admin"]}>
                <Game />
              </ProtectedRoutes>
            }
          />

          {/* Catch-all error route */}
          <Route
            path="*"
            element={
              <ErrorPage
                errorCode="ERR404"
                errorMessage="The page you are looking for does not exist."
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};
