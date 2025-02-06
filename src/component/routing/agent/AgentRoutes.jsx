import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { AgentDashboard } from "../../agent/pages/AgentDashboard";
import { ManagePassword } from "../../agent/pages/dashboardContent/ManagePassword";
import { Settings } from "../../agent/pages/dashboardContent/Setting";
import { Dashboard } from "../../agent/pages/dashboardContent/Dashboard";
import { BlockMarket } from "../../agent/pages/dashboardContent/BlockMarket";
import { BlockedClient } from "../../agent/pages/dashboardContent/BlockedClient";
import { TempComp } from "../../routing/helper/TempComp";
import { ManageClientsRoutes } from "./ManageClientsRoutes"; // Import the separate route handling component
import { AgentManageUser } from "../../agent/pages/dashboardContent/manageClient/AgentManageUser";
import { ManageCommissions } from "../../agent/pages/dashboardContent/ManageCommision";
import { LiveCasino } from "../../agent/pages/dashboardContent/LiveCasino";

export const AgentRoutes = () => {
  return (
    <Routes>
      <Route path={path.home} element={<AgentDashboard />}>
        <Route index element={<Dashboard />} />
        {/* Nested ManageClients route */}
        <Route
          path={`${path.manageClients}/*`}
          element={<ManageClientsRoutes />}
        />
        <Route path={path.userInfo} element={<AgentManageUser />} />
        <Route path={path.recieveCash} />
        <Route path={path.payCash} />
        <Route path={path.managePassword} element={<ManagePassword />} />
        <Route path={path.settings} element={<Settings />} />
        <Route path={path.blockClients} element={<BlockedClient />} />
        <Route path={path.commision} element={<ManageCommissions />} />
        <Route path={path.ledger} element={<TempComp label="ledger" />} />
        <Route path={path.blockMarket} element={<BlockMarket />} />
        <Route path={path.liveCasino} element={<LiveCasino />} />
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

      {/* Catch-all route for 404 errors */}
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
