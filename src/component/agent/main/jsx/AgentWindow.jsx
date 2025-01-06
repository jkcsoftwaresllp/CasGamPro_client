import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./AgentSidebar";

import { ManageClients } from "../../pages/dashboardContent/ManageClient";

import { ManagePassword } from "../../pages/dashboardContent/ManagePassword";
import { Dashboard } from "../../pages/dashboardContent/Dashboard";
import { Settings } from "../../pages/dashboardContent/Setting";
import style from "../styles/AgentWindow.module.css";

// Import page components
import { AgentNewUser } from "../../pages/dashboardContent/manageClient/AgentNewUser";

export const AgentWindow = () => {
  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.window}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="" element={<Dashboard />} />
          <Route path="manageClients" element={<ManageClients />} />
          <Route path="manageClient/adduser" element={<AgentNewUser />} />{" "}
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
