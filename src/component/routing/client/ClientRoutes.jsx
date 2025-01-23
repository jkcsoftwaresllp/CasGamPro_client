import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { Home } from "../../client/jsx/Home";
import { TempComp } from "../helper/TempComp";
import { GameCatagoryRoutes } from "./GameCatagoryRoutes";
import { Rules } from "../../client/rules/jsx/Rules";
import { LedgerMain } from "../../client/ledger/jsx/LedgerMain";
import { ChangePassword } from "../../client/settings/jsx/ChangePassword";

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path={path.home} index element={<Home />} />
      <Route path={`${path.gameCatagory}/*`} element={<GameCatagoryRoutes />} />
      <Route path={path.ledger} element={<LedgerMain />} />
      <Route path={path.password} element={<ChangePassword />} />
      <Route
        path={path.playHistory}
        element={<TempComp label={"Play History"} />}
      />
      <Route path={path.rules} element={<Rules />} />
      <Route path={path.settings} element={<TempComp label={"Settings"} />} />

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
