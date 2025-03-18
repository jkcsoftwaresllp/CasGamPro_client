import {
  ManageClientsIcon,
  ManagePasswordIcon,
  DashboardIcon,
  myClient,
  blockClient,
  rupees,
  CasinoIcon,
  LedgerIcon,
  AddUserIcon,
  InOutIcon,
  BookIcon,
  BlockIcon,
} from "../../../assets/assets";
import { roles } from "../../../utils/roles";
import { routesPathClient as path } from "../../routing/helper/routesPathClient";

export const agentSidebarItems = (basePath) => [
  {
    id: 1,
    label: "Dashboard",
    value: "dashboard",
    icon: DashboardIcon,
    path: `${basePath}${path.home}`,
  },
  {
    id: 2,
    label: "Daily P/L Report",
    value: "DailyReport",
    icon: CasinoIcon,
    path: `${basePath}${path.liveCasino}`,
  },
  {
    id: 3,
    label: "Manage Clients",
    value: "addnewuser",
    path: `${basePath}${path.manageClients}`,
    icon: ManageClientsIcon,
    subOptions: [
      {
        id: 31,
        label: " Add New User",
        value: "addnewuser",
        icon: AddUserIcon,
        path: `${basePath}${path.manageClients}${path.addnewuser}`,
      },
      {
        id: 32,
        label: "My Clients",
        value: "myClients",
        icon: myClient,
        path: `${basePath}${path.manageClients}`,
      },
      {
        id: 33,
        label: "Blocked Client",
        value: "blockClient",
        icon: blockClient,
        path: `${basePath}${path.blockClients}`,
      },
      {
        id: 34,
        label: "Commission and Limits",
        value: "commission",
        icon: rupees,
        path: `${basePath}${path.commision}`,
      },
    ],
  },
  {
    id: 4,
    label: "Block Market",
    value: "blockMarket",
    icon: BlockIcon,
    path: `${basePath}${path.blockMarket}`,
  },
  {
    id: 5,
    label: "Manage Password",
    value: "managePassword",
    icon: ManagePasswordIcon,
    path: `${basePath}${path.managePassword}`,
  },

  {
    //ledger
    id: 6,
    label: "Ledger",
    value: "ledger",
    icon: LedgerIcon,
    path: `${basePath}${path.collectionReport}`,
    subOptions: [
      {
        id: 61,
        label: "Collection Report",
        value: "collectionReport",
        icon: BookIcon,
        path: `${basePath}${path.collectionReport}`,
      },
      {
        id: 62,
        label: "Company Len/Den",
        value: "companyLenDen",
        icon: BookIcon,
        path: `${basePath}${path.companyLenDen}`,
      },
      {
        id: 63,
        label: "In-Out",
        value: "inOut",
        icon: InOutIcon,
        path: `${basePath}${path.inOut}`,
      },
      {
        id: 64,
        label: "Profit & Loss",
        value: "profitAndLoss",
        icon: rupees,
        path: `${basePath}${path.profitAndLoss}`,
      },
    ],
  },
];

export const sidebarConfig = {
  [roles.AGENT]: agentSidebarItems(path.agent),
  [roles.SUPERAGENT]: [...agentSidebarItems(path.superagent)],
  [roles.ADMIN]: [...agentSidebarItems(path.admin)],
};
