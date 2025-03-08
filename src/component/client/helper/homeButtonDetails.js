import { routesPathClient as path } from "../../routing/helper/routesPathClient";

export const homeButtonDetails = [
  { label: "Game Category", path: path.gameCatagory },
  { label: "Ledger", path: `${path.table}${path.ledger}` },
  { label: "Manage Password", path: path.password },
  { label: "Statement", path: `${path.table}${path.playHistory}` },
  { label: "Rules", path: path.rules },
  { label: "Settings", path: path.settings },
];
