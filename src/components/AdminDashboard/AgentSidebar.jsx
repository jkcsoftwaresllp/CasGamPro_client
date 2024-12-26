import { useState } from "react";
import style from "./styles/AdminSidebar.module.css";
import Collapse from "../../../public/icons/collapse.svg";
import Expand from "../../../public/icons/expand.svg";

import { Tab } from "./Tab";
import { sidebarItems } from "./helper/sidebarItems";

const Sidebar = ({ selectedOption, onOptionSelect }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  
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
          <div
            key={item.value}
            className={selectedOption === item.value ? style.active : ""}
            onClick={() => onOptionSelect(item.value)}
          >
            <Tab
              icon={item.icon}
              title={item.label}
              onClickValue={item.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
