import { useState } from "react";
import style from "./styles/AdminSidebar.module.css";
import Collapse from "../../../public/icons/collapse.svg";
import Expand from "../../../public/icons/expand.svg";
import DashboardIcon from "../../../public/icons/dashboard.svg";
import ManageClientsIcon from "../../../public/icons/manage_accounts.svg";
import ManagePasswordIcon from "../../../public/icons/password.svg";
import SettingsIcon from "../../../public/icons/settings.svg";

const Sidebar = ({ selectedOption, onOptionSelect }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const sidebarItems = [
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

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  return (
    <div className={`${style.sidebar} ${isMinimized ? style.minimized : ""}`}>
      <button className={style.toggleButton} onClick={toggleSidebar}>
        <img
          src={isMinimized ? Expand : Collapse}
          alt={isMinimized ? "Expand" : "Collapse"}
        />
      </button>
      <ul>
        {sidebarItems.map((item) => (
          <li
            key={item.value}
            className={selectedOption === item.value ? style.active : ""}
            onClick={() => onOptionSelect(item.value)}
          >
            <img src={item.icon} alt={item.label} className={style.icon} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
