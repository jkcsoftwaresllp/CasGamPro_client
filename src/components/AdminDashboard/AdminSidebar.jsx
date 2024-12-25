import { useState } from "react";
import style from "./styles/AdminSidebar.module.css";

const Sidebar = ({ selectedOption, onOptionSelect }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const sidebarItems = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Manage Clients", value: "manageClients" },
    { label: "Manage Password", value: "managePassword" },
    { label: "Settings", value: "settings" },
  ];

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  return (
    <div className={`${style.sidebar} ${isMinimized ? style.minimized : ""}`}>
      <button className={style.toggleButton} onClick={toggleSidebar}>
        {isMinimized ? ">" : "<"}
      </button>
      <ul>
        {sidebarItems.map((item) => (
          <li
            key={item.value}
            className={selectedOption === item.value ? style.active : ""}
            onClick={() => onOptionSelect(item.value)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
