import { DashboardLayout } from "../../layout/jsx/DashboardLayout";
import { routesPathClient as path } from "../helper/routesPathClient";

const agentPath = path.client;
const tablePath = path.table;
const playHistory = path.playHistory;
const ledger = path.ledger;

const tableURLRoutes = [
  `${agentPath}${tablePath}${playHistory}`,
  `${agentPath}${tablePath}${ledger}`,
];

const agentApiEndpoints = {
  [playHistory]: "/auth-api/client/playHistory",
  [ledger]: "/auth-api/client/ledger",
};

export const ClientTableLayout = () => {
  return (
    <DashboardLayout
      apiEndpoints={agentApiEndpoints}
      tableURLRoutes={tableURLRoutes}
    />
  );
};
