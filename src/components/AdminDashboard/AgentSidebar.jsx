import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./styles/AdminSidebar.module.css";
import Collapse from "./images/collapse.svg";
import Expand from "./images/expand.svg";

import { Tab } from "./Tab";
import { sidebarItems } from "./helper/sidebarItems";

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  return (
    <div className={`${style.sidebar} ${isMinimized ? style.minimized : ""}`}>
      <button className={style.toggleButton} onClick={toggleSidebar}>
        <img
          src={isMinimized ? Expand : Collapse}
          alt={isMinimized ? "Expand" : "Collapse"}
        />
      </button>
      <div>
        {sidebarItems.map((item) => (
          <Link
            key={item.value}
            to={`/agent/${item.value}`}
            className={`${style.tab} ${
              location.pathname.includes(item.value) ? style.active : ""
            }`}
          >
            <Tab icon={item.icon} title={item.label} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
