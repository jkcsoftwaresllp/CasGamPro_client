import DashboardIcon from "../images/dashboard.svg";
import ManageClientsIcon from "../images/manage_accounts.svg";
import ManagePasswordIcon from "../images/password.svg";
import SettingsIcon from "../images/settings.svg";

export const sidebarItems = [
  { label: "Dashboard", value: "dashboard", icon: DashboardIcon },
  {
    label: "Manage Clients",
    value: "manageClients",
    icon: ManageClientsIcon,
  },
  {
    label: "Manage Password",
    value: "managePassword",
    icon: ManagePasswordIcon,
  },
  { label: "Settings", value: "settings", icon: SettingsIcon },
];
