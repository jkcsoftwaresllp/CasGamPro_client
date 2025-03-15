import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "./PanelSidebar.module.css";
import { ExpandIcon, CollapseIcon } from "../../../assets/assets";
import { Tab } from "../../agent/main/jsx/Tab";
import { sidebarConfig } from "../helper/sidebarConfig";

export const PanelSidebar = ({ role, setHeaderTitle }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  const handleExpand = (item) => {
    setExpandedItem(expandedItem === item.id ? null : item.id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMinimized(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sidebarItems = sidebarConfig[role] || [];

  return (
    <div
      ref={sidebarRef}
      className={`${style.sidebar} ${isMinimized ? style.minimized : ""}`}
    >
      <button className={style.toggleButton} onClick={toggleSidebar}>
        {isMinimized ? ExpandIcon : CollapseIcon}
      </button>
      <div className={style.tabsContainer}>
        {sidebarItems.map((item) => (
          <div key={item.id}>
            <Tab
              icon={item.icon}
              onClick={() => {
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
