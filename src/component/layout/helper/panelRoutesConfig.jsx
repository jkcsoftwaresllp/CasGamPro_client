import { routesPathClient as path } from "../../routing/helper/routesPathClient";
import { AgentDashboard } from "../../panels/dashboard/AgentDashboard";
import { ManagePassword } from "../../agent/pages/dashboardContent/ManagePassword";
import { Settings } from "../../agent/pages/dashboardContent/Setting";
import { Dashboard } from "../../agent/pages/dashboardContent/Dashboard";
import { AgentManageUser } from "../../agent/pages/dashboardContent/manageClient/AgentManageUser";
import { CollectionReport } from "../../agent/pages/dashboardContent/CollectionReport";
import { BlockTable } from "../../agent/pages/dashboardContent/table/BlockTable";
import { CommissionTable } from "../../agent/pages/dashboardContent/CommisionTable";
import { BlockMarketTable } from "../../agent/pages/dashboardContent/table/BlockMarketTable";
import { LedgerTable } from "../../agent/pages/dashboardContent/table/LedgerTable";
import { InOutTable } from "../../agent/pages/dashboardContent/table/InOutTable";
import { ProfitLossTable } from "../../agent/pages/dashboardContent/table/ProfitLossTable";
import { LiveCasinoTable } from "../../agent/pages/dashboardContent/table/LiveCasinoTable";
import { ManageClientsRoutes } from "../../routing/panel/ManageClientsRoutes";
import { roles } from "../../../utils/roles";

const commonRoutes = [
  { path: path.home, element: <Dashboard /> },
  { path: `${path.manageClients}/*`, element: <ManageClientsRoutes /> },
  { path: path.userInfo, element: <AgentManageUser /> },
  { path: path.managePassword, element: <ManagePassword /> },
  { path: path.settings, element: <Settings /> },
  { path: path.blockClients, element: <BlockTable /> },
  { path: path.commision, element: <CommissionTable /> },
  { path: path.blockMarket, element: <BlockMarketTable /> },
  { path: path.liveCasino, element: <LiveCasinoTable /> },
  { path: path.collectionReport, element: <CollectionReport /> },
  { path: path.companyLenDen, element: <LedgerTable /> },
  { path: path.profitAndLoss, element: <ProfitLossTable /> },
  { path: path.inOut, element: <InOutTable /> },
];

export const panelRoutesConfig = {
  [roles.AGENT]: {
    dashboard: AgentDashboard,
    routes: [...commonRoutes],
  },
  [roles.SUPERAGENT]: {
    dashboard: AgentDashboard, // Replace with actual Super-Agent Dashboard
    routes: [...commonRoutes],
  },
  [roles.ADMIN]: {
    dashboard: AgentDashboard, // Replace with actual Admin Dashboard
    routes: [...commonRoutes],
  },
};
