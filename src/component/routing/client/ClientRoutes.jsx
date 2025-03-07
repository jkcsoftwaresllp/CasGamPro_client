import { Routes, Route, Navigate } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { Home } from "../../client/jsx/Home";
import { TempComp } from "../helper/TempComp";
import { GameCatagoryRoutes } from "./GameCatagoryRoutes";
import { Rules } from "../../client/rules/jsx/Rules";
import { LedgerMain } from "../../client/ledger/jsx/LedgerMain";
import { ChangePassword } from "../../client/changePassword/jsx/ChangePassword";
import { Statement } from "../../client/playHistory/jsx/Statement";
import { ClientTableLayout } from "./ClientTableLayout";

export const ClientRoutes = () => {
  const ledgerPath = path.ledger.replace("/", "");
  const playHistoryPath = path.playHistory.replace("/", "");

  return (
    <Routes>
      <Route path={path.home} index element={<Home />} />
      <Route path={`${path.gameCatagory}/*`} element={<GameCatagoryRoutes />} />
      <Route path={`${path.table}`} element={<ClientTableLayout />}>
        <Route index element={<Navigate to={path.client} />} />
        <Route path={ledgerPath} element={<LedgerMain />} />
        <Route path={playHistoryPath} element={<Statement />} />
      </Route>

      <Route path={path.password} element={<ChangePassword />} />
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
