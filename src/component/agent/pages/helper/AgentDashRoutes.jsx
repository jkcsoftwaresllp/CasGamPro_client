import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../../../agent/pages/dashboardContent/Dashboard";
import { ManageClients } from "../../../agent/pages/dashboardContent/ManageClient";
import { ManagePassword } from "../../../agent/pages/dashboardContent/ManagePassword";
import { Settings } from "../../../agent/pages/dashboardContent/Setting";
import { routesPathClient as path } from "../../../routing/helper/routesPathClient";
export const AgentDashRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<Dashboard />} />
      <Route path={path.manageClients} element={<ManageClients />} />
      <Route path={path.managePassword} element={<ManagePassword />} />
      <Route path={path.settings} element={<Settings />} />
    </Routes>
  );
};
