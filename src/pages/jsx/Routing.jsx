import { Routes, Route } from "react-router-dom";
import style from "../styles/Routing.module.css";

import { Home } from "./Home";
import { LoginPage } from "../../component/agent/pages/dashboardContent/LoginPage";
import { AgentWindow } from "../../component/agent/main/jsx/AgentWindow";
import { Test } from "../../component/test/test";
import { Game } from "../../component/game/common/layout/jsx/Game";

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

          <Route path="/dash" element={<LayoutDash />}>
            <Route index element={<Rules />} />
            <Route path="home" element={<HomeDash />} />
            <Route path="schedule" element={<Schedule />} />{" "}
          </Route>
          <Route
            path="*"
            element={
              <ErrorPage
                errorCode="ERR404"
                errorMessage="The page you are looking for does not exist."
              />
            }
          />

          <Route
            path="/agent"
            element={
              <ProtectedRoutes allowedRoles={["agent"]}>
                <AgentWindow />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoutes allowedRoles={["player", "agent"]}>
                <Game />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </div>
  );
};
