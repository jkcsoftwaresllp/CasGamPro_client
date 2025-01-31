import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/AgentSidebar.module.css";
import { ExpandIcon, CollapseIcon } from "../../../../assets/assets";
import { Tab } from "./Tab";
import { sidebarItems } from "../helper/sidebarItems";

export const AgentSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  const handleExpand = (item) => {
    if (expandedItem === item.id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(item.id);
    }
  };

  return (
    <div className={`${style.sidebar} ${isMinimized ? style.minimized : ""}`}>
      <button className={style.toggleButton} onClick={toggleSidebar}>
        {isMinimized ? ExpandIcon : CollapseIcon}
      </button>
      <div className={style.tabsContainer}>
        {sidebarItems.map((item) => (
          <div key={item.id}>
            <Tab
              icon={item.icon}
              onClick={() => {
                if (item.subOptions) {
                  handleExpand(item);
                } else {
                  console.log(item.path);
                  navigate(item.path);
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
                    onClick={() => {
                      console.log(sub.path);
                      navigate(sub.path);
                    }}
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
