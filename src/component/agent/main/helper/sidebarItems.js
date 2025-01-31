import { DashboardIcon } from "../../../../assets/assets";
import {
  ManageClientsIcon,
  ManagePasswordIcon,
  SettingsIcon,
  myClient,
  blockClient,
  rupees,
  CasinoIcon,
  LedgerIcon,
  AddUserIcon,
  InOutIcon,
  BookIcon,
  BlockIcon,
} from "../../../../assets/assets";

import { routesPathClient } from "../../../routing/helper/routesPathClient";
export const sidebarItems = [
  {
    id: 1,
    label: "Dashboard",
    value: "dashboard",
    icon: DashboardIcon,
    path: `${routesPathClient.agent}${routesPathClient.home}`,
  },
  {
    id: 2,
    label: "Live Casino",
    value: "liveCasino",
    icon: CasinoIcon,
    path: `${routesPathClient.agent}${routesPathClient.liveCasino}`,
  },
  {
    id: 3,
    label: "Manage Clients",
    value: "manageClients",

    icon: ManageClientsIcon,
    subOptions: [
      {
        id: 31,
        label: " Add New User",
        value: "addnewuser",
        icon: AddUserIcon,
        path: `${routesPathClient.agent}${routesPathClient.addnewuser}`,
      },
      {
        id: 32,
        label: "My Clients",
        value: "myClients",
        icon: myClient,
        path: `${routesPathClient.agent}${routesPathClient.manageClients}`,
      },
      {
        id: 33,
        label: "Blocked Client",
        value: "blockClient",
        icon: blockClient,
        path: `${routesPathClient.agent}${routesPathClient.blockClients}`,
      },
      {
        id: 34,
        label: "Commision and Limits",
        value: "commision",
        icon: rupees,
        path: `${routesPathClient.agent}${routesPathClient.commision}`,
      },
    ],
  },
  {
    id: 4,
    label: "Block Market",
    value: "blockMarket",
    icon: BlockIcon,
    path: `${routesPathClient.agent}${routesPathClient.blockMarket}`,
  },
  {
    id: 5,
    label: "Manage Password",
    value: "managePassword",
    icon: ManagePasswordIcon,
    path: `${routesPathClient.agent}${routesPathClient.managePassword}`,
  },

  {
    //ledger
    id: 6,
    label: "Ledger",
    value: "ledger",
    icon: LedgerIcon,
    subOptions: [
      {
        id: 61,
        label: "Collection Report",
        value: "collectionReport",
        icon: BookIcon,
        path: `${routesPathClient.agent}${routesPathClient.collectionReport}`,
      },
      {
        id: 62,
        label: "Company Len/Den",
        value: "companyLenDen",
        icon: BookIcon,
        path: `${routesPathClient.agent}${routesPathClient.companyLenDen}`,
      },
      {
        id: 63,
        label: "In-Out",
        value: "inOut",
        icon: InOutIcon,
        path: `${routesPathClient.agent}${routesPathClient.inOut}`,
      },
      {
        id: 64,
        label: "P & L",
        value: "profitAndLoss",
        icon: rupees,
        path: `${routesPathClient.agent}${routesPathClient.profitAndLoss}`,
      },
    ],
  },
];
