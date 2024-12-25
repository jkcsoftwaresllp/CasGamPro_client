// src/Page.js
import React, { useState } from "react";
import Dashboard from "./Dashboard";
import ManageClients from "./ManageClient";
import ManagePassword from "./ManagePassword";
import Settings from "./Setting";
import Sidebar from "../../components/AdminDashboard/AdminSidebar";
import style from "../../styles/AdminDashboard.module.css";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("dashboard"); // Default to 'dashboard'

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "dashboard":
        return <Dashboard />;
      case "manageClients":
        return <ManageClients />;
      case "managePassword":
        return <ManagePassword />;
      case "settings":
        return <Settings />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className={style.pageContainer}>
      {/* Sidebar on the left */}
      <Sidebar
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
      />

      {/* Content area on the right */}
      <div className={style.content}>{renderContent()}</div>
    </div>
  );
};

export default Page;
