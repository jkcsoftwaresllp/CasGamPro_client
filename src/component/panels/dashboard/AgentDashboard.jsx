import { PanelSidebar } from "../sidebars/PanelSidebar";
import { routesPathClient as path } from "../../routing/helper/routesPathClient";
import { DashboardLayout } from "../../layout/jsx/DashboardLayout";

const agentPath = path.agent;
const manageClients = path.manageClients;
const blockClients = path.blockClients;
const commision = path.commision;
const companyLenDen = path.companyLenDen;
const profitAndLoss = path.profitAndLoss;
const inOut = path.inOut;
const liveCasino = path.liveCasino;

const tableURLRoutes = [
  `${agentPath}${manageClients}`,
  `${agentPath}${blockClients}`,
  `${agentPath}${commision}`,
  `${agentPath}${companyLenDen}`,
  `${agentPath}${profitAndLoss}`,
  `${agentPath}${inOut}`,
  `${agentPath}${liveCasino}`,
];

const agentApiEndpoints = {
  [manageClients]: "/auth-api/agent/players",
  [blockClients]: "/auth-api/agent/blocked",
  [commision]: "/auth-api/agent/commissionLimits",
  [companyLenDen]: "/auth-api/agent/ledger",
  [profitAndLoss]: "/auth-api/agent/profit-loss",
  [inOut]: "/auth-api/agent/inout",
  [liveCasino]: "/auth-api/agent/liveCasinoReports",
};

export const AgentDashboard = () => {
  return (
    <DashboardLayout
      sidebarComponent={PanelSidebar}
      apiEndpoints={agentApiEndpoints}
      defaultHeaderTitle="Agent Dashboard"
      tableURLRoutes={tableURLRoutes}
    />
  );
};
