import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/AgentSidebar.module.css";
import { ExpandIcon, CollapseIcon } from "../../../../assets/assets";
import { Tab } from "./Tab";
import { sidebarItems } from "../helper/sidebarItems";

export const AgentSidebar = ({ setHeaderTitle }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  const handleExpand = (item) => {
    setExpandedItem(expandedItem === item.id ? null : item.id);
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
                // Update the header text
                setHeaderTitle(item.label);
                if (item.subOptions) {
                  handleExpand(item);
                } else {
                  navigate(item.path);
                }
              }}
              title={item.label}
              isMinimized={isMinimized}
            />

            {expandedItem === item.id && item.subOptions && (
              <div className={style.subOptionsContainer}>
                {item.subOptions.map((sub) => (
                  <Tab
                    key={sub.id}
                    icon={sub.icon}
                    onClick={() => {
                      // Update the header for sub-options too
                      setHeaderTitle(sub.label);
                      navigate(sub.path);
                    }}
                    title={sub.label}
                    className={style.subOption}
                    isMinimized={isMinimized}
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
