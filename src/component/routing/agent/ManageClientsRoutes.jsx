import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient"; // Path helper
import { ManageClients } from "../../agent/pages/dashboardContent/ManageClient";
import { AgentNewUser } from "../../agent/pages/dashboardContent/manageClient/AgentNewUser";
import { EditUser } from "../../agent/pages/dashboardContent/jsx/EditUser";
import { ClientOutlet } from "../../agent/pages/dashboardContent/ClientOutlet"; // Outlet component for nested routing

export const ManageClientsRoutes = () => {
  return (
    <Routes>
      {/* Main route for managing clients */}
      <Route path="/" element={<ClientOutlet />}>
        <Route index element={<ManageClients />} />
        <Route path={path.addnewuser} element={<AgentNewUser />} />
        <Route path={path.editUser} element={<EditUser />} />
      </Route>
    </Routes>
  );
};
