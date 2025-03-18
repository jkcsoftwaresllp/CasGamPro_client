import { PanelSidebar } from "../sidebars/PanelSidebar";
import { routesPathClient as path } from "../../routing/helper/routesPathClient";
import { DashboardLayout } from "../../layout/jsx/DashboardLayout";
import { useAuth } from "../../../context/jsx/AuthContext";
import { roles } from "../../../utils/roles";

const manageClients = path.manageClients;
const blockClients = path.blockClients;
const commision = path.commision;
const companyLenDen = path.companyLenDen;
const profitAndLoss = path.profitAndLoss;
const inOut = path.inOut;
const liveCasino = path.liveCasino;

const agentApiEndpoints = {
  [manageClients]: "/auth-api/panel/childs",
  [blockClients]: "/auth-api/agent/blocked",
  [commision]: "/auth-api/agent/commissionLimits",
  [companyLenDen]: "/auth-api/agent/ledger",
  [profitAndLoss]: "/auth-api/agent/profit-loss",
  [inOut]: "/auth-api/agent/inout",
  [liveCasino]: "/auth-api/agent/liveCasinoReports",
};

const rolePathData = {
  [roles.AGENT]: path.agent,
  [roles.ADMIN]: path.admin,
  [roles.SUPERAGENT]: path.superagent,
  [roles.PLAYER]: path.client,
};

export const AgentDashboard = () => {
  const { user } = useAuth();
  const role = user?.userRole;
  const agentPath = rolePathData[role];

  const tableURLRoutes = [
    `${agentPath}${manageClients}`,
    `${agentPath}${blockClients}`,
    `${agentPath}${commision}`,
    `${agentPath}${companyLenDen}`,
    `${agentPath}${profitAndLoss}`,
    `${agentPath}${inOut}`,
    `${agentPath}${liveCasino}`,
  ];

  return (
    <DashboardLayout
      sidebarComponent={PanelSidebar}
      apiEndpoints={agentApiEndpoints}
      defaultHeaderTitle="Agent Dashboard"
      tableURLRoutes={tableURLRoutes}
    />
  );
};
