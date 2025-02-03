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

import { routesPathClient as path } from "../../../routing/helper/routesPathClient";
export const sidebarItems = [
  {
    id: 1,
    label: "Dashboard",
    value: "dashboard",
    icon: DashboardIcon,
    path: `${path.agent}${path.home}`,
  },
  {
    id: 2,
    label: "Live Casino",
    value: "liveCasino",
    icon: CasinoIcon,
    path: `${path.agent}${path.liveCasino}`,
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
        path: `${path.agent}${path.manageClients}${path.addnewuser}`,
      },
      {
        id: 32,
        label: "My Clients",
        value: "myClients",
        icon: myClient,
        path: `${path.agent}${path.manageClients}`,
      },
      {
        id: 33,
        label: "Blocked Client",
        value: "blockClient",
        icon: blockClient,
        path: `${path.agent}${path.blockClients}`,
      },
      {
        id: 34,
        label: "Commision and Limits",
        value: "commision",
        icon: rupees,
        path: `${path.agent}${path.commision}`,
      },
    ],
  },
  {
    id: 4,
    label: "Block Market",
    value: "blockMarket",
    icon: BlockIcon,
    path: `${path.agent}${path.blockMarket}`,
  },
  {
    id: 5,
    label: "Manage Password",
    value: "managePassword",
    icon: ManagePasswordIcon,
    path: `${path.agent}${path.managePassword}`,
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
        path: `${path.agent}${path.collectionReport}`,
      },
      {
        id: 62,
        label: "Company Len/Den",
        value: "companyLenDen",
        icon: BookIcon,
        path: `${path.agent}${path.companyLenDen}`,
      },
      {
        id: 63,
        label: "In-Out",
        value: "inOut",
        icon: InOutIcon,
        path: `${path.agent}${path.inOut}`,
      },
      {
        id: 64,
        label: "P & L",
        value: "profitAndLoss",
        icon: rupees,
        path: `${path.agent}${path.profitAndLoss}`,
      },
    ],
  },
];
