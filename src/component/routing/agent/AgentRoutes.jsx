import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { AgentDashboard } from "../../agent/pages/AgentDashboard";
import { ManageClients } from "../../agent/pages/dashboardContent/ManageClient";
import { ManagePassword } from "../../agent/pages/dashboardContent/ManagePassword";
import { Settings } from "../../agent/pages/dashboardContent/Setting";
import { Dashboard } from "../../agent/pages/dashboardContent/Dashboard";

import { BlockedClient } from "../../agent/pages/dashboardContent/BlockedClient";
import { TempComp } from "../../routing/helper/TempComp";
import { AgentNewUser } from "../../agent/pages/dashboardContent/manageClient/AgentNewUser";

export const AgentRoutes = () => {
  return (
    <Routes>
      <Route path={path.home} element={<AgentDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path={path.manageClients} element={<ManageClients />} />
        <Route path={path.addnewuser} element={<AgentNewUser />} />

        <Route path={path.managePassword} element={<ManagePassword />} />
        <Route path={path.settings} element={<Settings />} />
        <Route path={path.blockClients} element={<BlockedClient />} />
        <Route path={path.commision} element={<TempComp label="commision" />} />
        <Route path={path.ledger} element={<TempComp label="ledger" />} />
        <Route path={path.liveCasino} element={<TempComp label="casino" />} />
        <Route
          path={path.collectionReport}
          element={<TempComp label="collection report" />}
        />
        <Route
          path={path.companyLenDen}
          element={<TempComp label="company len den " />}
        />
        <Route
          path={path.profitAndLoss}
          element={<TempComp label="profit loss" />}
        />
        <Route path={path.inOut} element={<TempComp label="in out" />} />
      </Route>

      <Route
        path="*"
        element={
          <ErrorPage
            errorCode="ERR404"
            errorMessage="Agent The page you are looking for does not exist."
          />
        }
      />
    </Routes>
  );
};
