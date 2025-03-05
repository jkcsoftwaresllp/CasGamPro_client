import { AgentSidebar } from "../main/jsx/AgentSidebar";
import { routesPathClient as path } from "../routing/helper/routesPathClient";
import { DashboardLayout } from "../layout/jsx/DashboardLayout";

const supperAgentPath = path.superAgent;
const manageClients = path.manageClients;
const blockClients = path.blockClients;
const commision = path.commision;
const companyLenDen = path.companyLenDen;
const profitAndLoss = path.profitAndLoss;
const inOut = path.inOut;
const liveCasino = path.liveCasino;

const tableURLRoutes = [
  `${supperAgentPath}${manageClients}`,
  `${supperAgentPath}${blockClients}`,
  `${supperAgentPath}${commision}`,
  `${supperAgentPath}${companyLenDen}`,
  `${supperAgentPath}${profitAndLoss}`,
  `${supperAgentPath}${inOut}`,
  `${supperAgentPath}${liveCasino}`,
];

const agentApiEndpoints = {
  [manageClients]: "/auth-api/supper-agent/players",
  [blockClients]: "/auth-api/supper-agent/blocked",
  [commision]: "/auth-api/supper-agent/commissionLimits",
  [companyLenDen]: "/auth-api/supper-agent/ledger",
  [profitAndLoss]: "/auth-api/supper-agent/profit-loss",
  [inOut]: "/auth-api/supper-agent/inout",
  [liveCasino]: "/auth-api/supper-agent/liveCasinoReports",
};

export const SupperAgentDashboard = () => {
  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      sidebarComponent={AgentSidebar}
      apiEndpoints={agentApiEndpoints}
      defaultHeaderTitle="Agent Dashboard"
      tableURLRoutes={tableURLRoutes}
    />
  );
};
