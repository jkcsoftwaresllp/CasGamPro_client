import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { GameList } from "../../client/gammeList/GameList";
import { Game } from "../../game/common/layout/jsx/Game";

export const GameRoutes = () => {
  return (
    <Routes>
      <Route path={path.home} index element={<GameList />} />
      <Route path={"/game"} element={<Game />} />

      <Route
        path="*"
        element={
          <ErrorPage
            errorCode="ERR404"
            errorMessage="The Game you are looking for does not exist."
          />
        }
      />
    </Routes>
  );
};
