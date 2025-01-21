import { Routes, Route } from "react-router-dom";
import style from "../style/Routing.module.css";

import { Home } from "../../../pages/jsx/Home";
import { AgentWindow } from "../../agent/main/jsx/AgentWindow";
import { Test } from "../../test/test";
import { Game } from "../../game/common/layout/jsx/Game";
import { GameList } from "../../game/pages/GameList";
import { LayoutDash } from "../../../layoutDash/jsx/LayoutDash";
import { Rules } from "../../../layoutDash/pages/Rules";
import { HomeDash } from "../../../layoutDash/pages/HomeDash";
import { Schedule } from "../../../layoutDash/pages/Schedule";
import { ErrorPage } from "../../../pages/jsx/Error";
import { ProtectedRoutes } from "../helper/ProtectedRoutes";
import { LoginPage } from "../../../pages/jsx/LoginPage";

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
              <ProtectedRoutes
                allowedRoles={["player", "agent", "admin"]}
                children={<GameList />}
              />
            }
          />

          <Route
            path="/dash/*"
            element={
              <ProtectedRoutes
                allowedRoles={["player", "agent", "admin"]}
                children={<LayoutDash />}
              />
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
