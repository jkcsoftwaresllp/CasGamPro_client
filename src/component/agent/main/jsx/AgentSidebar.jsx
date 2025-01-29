import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/AgentSidebar.module.css";
import Collapse from "../images/collapse.svg";
import Expand from "../images/expand.svg";

import { Tab } from "./Tab";
import { sidebarItems } from "../helper/sidebarItems";

export const AgentSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  const handleExpand = (item) => {
    if (expandedItem === item.id) {
      setExpandedItem(null); // Collapse if already expanded
    } else {
      setExpandedItem(item.id); // Expand the clicked item
    }
  };

  return (
    <div className={`${style.sidebar} ${isMinimized ? style.minimized : ""}`}>
      <button className={style.toggleButton} onClick={toggleSidebar}>
        <img
          src={isMinimized ? Expand : Collapse}
          alt={isMinimized ? "Expand" : "Collapse"}
        />
      </button>
      <div className={style.tabsContainer}>
        {sidebarItems.map((item) => (
          <div key={item.id}>
            <Tab
              icon={item.icon}
              onClick={() => {
                if (item.subOptions) {
                  handleExpand(item);
                }
              }}
              title={item.label}
            />

            {expandedItem === item.id && item.subOptions && (
              <div className={style.subOptionsContainer}>
                {item.subOptions.map((sub) => (
                  <Tab
                    key={sub.id}
                    icon={sub.icon}
                    onClick={() => navigate(sub.path)}
                    title={sub.label}
                    className={style.subOption}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
