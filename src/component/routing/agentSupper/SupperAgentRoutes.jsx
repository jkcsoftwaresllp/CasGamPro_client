import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { ManagePassword } from "../../agent/pages/dashboardContent/ManagePassword";
import { Settings } from "../../agent/pages/dashboardContent/Setting";
import { Dashboard } from "../../agent/pages/dashboardContent/Dashboard";

import { ManageAgentsRoutes } from "./ManageAgentsRoutes"; // Import the separate route handling component
import { AgentManageUser } from "../../agent/pages/dashboardContent/manageClient/AgentManageUser";
import { CollectionReport } from "../../agent/pages/dashboardContent/CollectionReport";
import { BlockTable } from "../../agent/pages/dashboardContent/table/BlockTable";
import { CommissionTable } from "../../agent/pages/dashboardContent/CommisionTable";
import { BlockMarketTable } from "../../agent/pages/dashboardContent/table/BlockMarketTable";
import { LedgerTable } from "../../agent/pages/dashboardContent/table/LedgerTable";
import { InOutTable } from "../../agent/pages/dashboardContent/table/InOutTable";
import { ProfitLossTable } from "../../agent/pages/dashboardContent/table/ProfitLossTable";
import { LiveCasinoTable } from "../../agent/pages/dashboardContent/table/LiveCasinoTable";
import { SupperAgentDashboard } from "../../agentSupper/SupperAgentDashboard";

export const SupperAgentRoutes = () => {
  const profile = "supper-agent";
  return (
    <Routes>
      <Route path={path.home} element={<SupperAgentDashboard />}>
        <Route index element={<Dashboard profile={profile} />} />
        {/* Nested ManageClients route */}
        <Route
          path={`${path.manageClients}/*`}
          element={<ManageAgentsRoutes profile={profile} />}
        />
        <Route path={path.userInfo} element={<AgentManageUser />} />
        <Route path={path.recieveCash} />
        <Route path={path.payCash} />
        <Route path={path.managePassword} element={<ManagePassword />} />
        <Route path={path.settings} element={<Settings />} />
        <Route path={path.blockClients} element={<BlockTable />} />
        <Route path={path.commision} element={<CommissionTable />} />
        <Route path={path.blockMarket} element={<BlockMarketTable />} />
        <Route path={path.liveCasino} element={<LiveCasinoTable />} />
        <Route
          path={path.collectionReport}
          element={<CollectionReport profile="supper-agent" />}
        />
        <Route path={path.companyLenDen} element={<LedgerTable />} />
        <Route path={path.profitAndLoss} element={<ProfitLossTable />} />
        <Route path={path.inOut} element={<InOutTable />} />
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
