import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { GameCatagory } from "../../client/jsx/GameCatagory";
import { TempComp } from "../helper/TempComp";
import { GameList } from "../../game/pages/GameList";

export const GameCatagoryRoutes = () => {
  return (
    <Routes>
      <Route path={path.home} index element={<GameCatagory />} />
      <Route path={path.catagory1} element={<GameList />} />
      <Route
        path={path.catagory2}
        element={<TempComp label={"Lattery games"} />}
      />
      <Route
        path={path.catagory3}
        element={<TempComp label={"Criket Games"} />}
      />

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
  );
};
