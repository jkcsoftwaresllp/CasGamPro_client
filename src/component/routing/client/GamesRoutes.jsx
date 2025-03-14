import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { GameList } from "../../client/gammeList/GameList";
import { GameRunner } from "../../game/common/layout/jsx/GameRunner";

export const GameRoutes = ({ catagory }) => {
  return (
    <Routes>
      <Route
        path={path.home}
        index
        element={<GameList catagory={catagory} />}
      />
      <Route path={"/game"} element={<GameRunner />} />

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
