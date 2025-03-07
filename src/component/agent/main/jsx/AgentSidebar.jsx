import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/AgentSidebar.module.css";
import { ExpandIcon, CollapseIcon } from "../../../../assets/assets";
import { Tab } from "./Tab";
import { sidebarItems } from "../helper/sidebarItems";

export const AgentSidebar = ({ setHeaderTitle }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();
  const sidebarRef = useRef(null); // Reference for detecting clicks outside

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  const handleExpand = (item) => {
    setExpandedItem(expandedItem === item.id ? null : item.id);
  };

  // Handle click outside to minimize the sidebar
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

  return (
    <div
      ref={sidebarRef} // Attach the ref to sidebar
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
