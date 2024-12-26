import { Routes, Route } from "react-router-dom";
import Sidebar from "./AgentSidebar";
import ManageClients from "../../pages/AgentDashboard/ManageClient";

import ManagePassword from "../../pages/AgentDashboard/ManagePassword";
import Dashboard from "../../pages/AgentDashboard/Dashboard";
import Settings from "../../pages/AgentDashboard/Setting";
import style from "./styles/AdminWindow.module.css";
import AgentNewUser from "../../pages/AgentNewUser";

const AdminWindow = () => {
  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.window}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
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

export default AdminWindow;
