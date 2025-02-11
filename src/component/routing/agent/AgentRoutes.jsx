import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { AgentDashboard } from "../../agent/pages/AgentDashboard";
import { ManagePassword } from "../../agent/pages/dashboardContent/ManagePassword";
import { Settings } from "../../agent/pages/dashboardContent/Setting";
import { Dashboard } from "../../agent/pages/dashboardContent/Dashboard";

import { TempComp } from "../../routing/helper/TempComp";
import { ManageClientsRoutes } from "./ManageClientsRoutes"; // Import the separate route handling component
import { AgentManageUser } from "../../agent/pages/dashboardContent/manageClient/AgentManageUser";
import { CollectionReport } from "../../agent/pages/dashboardContent/CollectionReport";
import { BlockTable } from "../../agent/pages/dashboardContent/table/BlockTable";
import { CommissionTable } from "../../agent/pages/dashboardContent/CommisionTable";
import { BlockMarketTable } from "../../agent/pages/dashboardContent/table/BlockMarketTable";
import { LedgerTable } from "../../agent/pages/dashboardContent/table/LedgerTable";
import { InOutTable } from "../../agent/pages/dashboardContent/table/InOutTable";
import { ProfitLossTable } from "../../agent/pages/dashboardContent/table/ProfitLossTable";
import { LiveCasinoTable } from "../../agent/pages/dashboardContent/table/LiveCasinoTable";

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
        <Route path={path.blockClients} element={<BlockTable />} />
        <Route path={path.commision} element={<CommissionTable />} />
        <Route path={path.ledger} element={<TempComp label="ledger" />} />
        <Route path={path.blockMarket} element={<BlockMarketTable />} />
        <Route path={path.liveCasino} element={<LiveCasinoTable />} />
        <Route path={path.collectionReport} element={<CollectionReport />} />
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
