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
    label: "Manage Password",
    value: "managePassword",
    icon: ManagePasswordIcon,
    path: `${routesPathClient.agent}${routesPathClient.managePassword}`,
  },

  {
    //ledger
    id: 5,
    label: "Ledger",
    value: "ledger",
    icon: LedgerIcon,
    subOptions: [
      {
        id: 51,
        label: "Collection Report",
        value: "collectionReport",
        icon: myClient,
        path: `${routesPathClient.agent}${routesPathClient.collectionReport}`,
      },
      {
        id: 52,
        label: "Company Len/Den",
        value: "companyLenDen",
        icon: blockClient,
        path: `${routesPathClient.agent}${routesPathClient.companyLenDen}`,
      },
      {
        id: 53,
        label: "In-Out",
        value: "inOut",
        icon: rupees,
        path: `${routesPathClient.agent}${routesPathClient.inOut}`,
      },
      {
        id: 54,
        label: "P & L",
        value: "profitAndLoss",
        icon: rupees,
        path: `${routesPathClient.agent}${routesPathClient.profitAndLoss}`,
      },
    ],
  },
];
