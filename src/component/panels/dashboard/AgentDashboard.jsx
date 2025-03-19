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
  [blockClients]: "/auth-api/panel/blocked",
  [commision]: "/auth-api/panel/commission-limits",
  [companyLenDen]: "/auth-api/panel/ledger",
  [profitAndLoss]: "/auth-api/panel/profit-loss",
  [inOut]: "/auth-api/panel/inout",
  [liveCasino]: "/auth-api/panel/liveCasinoReports",
};

export const rolePathData = {
  [roles.AGENT]: path.agent,
  [roles.ADMIN]: path.admin,
  [roles.SUPERAGENT]: path.superagent,
  [roles.PLAYER]: path.client,
};

const getDefaultTitle = (role) => {
  const temp = {
    [roles.AGENT]: "Agent Dashboard",
    [roles.ADMIN]: "Admin Dasboard",
    [roles.SUPERAGENT]: "Super Agent Dashboard",
    [roles.PLAYER]: "Client Dashboard",
  };
  return temp[role];
};

const getTableURL = (agentPath) => [
  `${agentPath}${manageClients}`,
  `${agentPath}${blockClients}`,
  `${agentPath}${commision}`,
  `${agentPath}${companyLenDen}`,
  `${agentPath}${profitAndLoss}`,
  `${agentPath}${inOut}`,
  `${agentPath}${liveCasino}`,
];

export const AgentDashboard = () => {
  const { user } = useAuth();
  const role = user?.userRole;
  const agentPath = rolePathData[role];
  const tableURLRoutes = getTableURL(agentPath);

  return (
    <DashboardLayout
      sidebarComponent={PanelSidebar}
      apiEndpoints={agentApiEndpoints}
      defaultHeaderTitle={getDefaultTitle(role)}
      tableURLRoutes={tableURLRoutes}
    />
  );
};
