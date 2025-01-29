import { DashboardIcon } from "../../../../assets/assets";
import { ManageClientsIcon } from "../../../../assets/assets";
import { ManagePasswordIcon } from "../../../../assets/assets";
import { SettingsIcon } from "../../../../assets/assets";
import { myClient } from "../../../../assets/assets";
import { blockClient } from "../../../../assets/assets";
import { rupees } from "../../../../assets/assets";
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
    label: "Manage Clients",
    value: "manageClients",

    icon: ManageClientsIcon,
    subOptions: [
      {
        id: 21,
        label: "My Clients",
        value: "myClients",
        icon: myClient,
        path: `${routesPathClient.agent}${routesPathClient.manageClients}`,
      },
      {
        id: 22,
        label: "Blocked Client",
        value: "blockClient",
        icon: blockClient,
        path: `${routesPathClient.agent}${routesPathClient.blockClients}`,
      },
      {
        id: 23,
        label: "Commision and Limits",
        value: "commision",
        icon: rupees,
        path: `${routesPathClient.agent}${routesPathClient.commision}`,
      },
    ],
  },
  {
    id: 3,
    label: "Manage Password",
    value: "managePassword",
    icon: ManagePasswordIcon,
    path: `${routesPathClient.agent}${routesPathClient.managePassword}`,
  },
  {
    id: 4,
    label: "Settings",
    value: "settings",
    icon: SettingsIcon,
    path: `${routesPathClient.agent}${routesPathClient.settings}`,
  },
];
