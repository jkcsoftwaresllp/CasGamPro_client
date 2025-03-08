import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { GameCatagory } from "../../client/jsx/GameCatagory";
import { TempComp } from "../helper/TempComp";
import { GameRoutes } from "./GamesRoutes";
import { useAuth } from "../../../context/jsx/AuthContext";
import { use } from "react";
import { blockLevels } from "../../../utils/blockLevers";

export const GameCatagoryRoutes = () => {
  const { user } = useAuth();
  if (user.blockingLevel === blockLevels[3]) {
    return (
      <ErrorPage
        errorCode="ERR403"
        errorMessage="Your account is blocked to play Games. Please contact your Agent"
      />
    );
  }

  return (
    <Routes>
      <Route path={path.home} index element={<GameCatagory />} />
      <Route path={`${path.catagory1}/*`} element={<GameRoutes />} />
      <Route
        path={path.catagory2}
        element={<TempComp label={"Lottery games"} />}
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
