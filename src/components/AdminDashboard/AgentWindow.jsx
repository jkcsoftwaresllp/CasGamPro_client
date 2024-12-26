import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./AgentSidebar";
import ManageClients from "../../pages/AgentDashboard/ManageClient";

import ManagePassword from "../../pages/AgentDashboard/ManagePassword";
import Dashboard from "../../pages/AgentDashboard/Dashboard";
import Settings from "../../pages/AgentDashboard/Setting";
import style from "./styles/AdminWindow.module.css";

const AdminWindow = () => {
  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.window}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manageClients" element={<ManageClients />} />
          <Route path="managePassword" element={<ManagePassword />} />
          <Route path="settings" element={<Settings />} />
          {/* Default route */}
          <Route
            path="*"
            element={<div>Select an option from the sidebar</div>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminWindow;
