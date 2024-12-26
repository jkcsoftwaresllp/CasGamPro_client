import DashboardIcon from "../../../../public/icons/dashboard.svg";
import ManageClientsIcon from "../../../../public/icons/manage_accounts.svg";
import ManagePasswordIcon from "../../../../public/icons/password.svg";
import SettingsIcon from "../../../../public/icons/settings.svg";

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
