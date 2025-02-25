import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient"; // Path helper

import { AgentNewUser } from "../../agent/pages/dashboardContent/manageClient/AgentNewUser";
import { EditUser } from "../../agent/pages/dashboardContent/jsx/EditUser";
import { ClientOutlet } from "../../agent/pages/dashboardContent/ClientOutlet"; // Outlet component for nested routing
import { AgentManageUser } from "../../agent/pages/dashboardContent/manageClient/AgentManageUser";
import { ClientTable } from "../../agent/pages/dashboardContent/table/ClientTable";
import { ReceiveCash } from "../../agent/pages/dashboardContent/jsx/RecieveCash";
import { PayCash } from "../../agent/pages/dashboardContent/jsx/PayCash";

export const ManageClientsRoutes = () => {
  return (
    <Routes>
      {/* Main route for managing clients */}
      <Route path="/" element={<ClientOutlet />}>
        <Route index element={<ClientTable />} />
        <Route path={path.addnewuser} element={<AgentNewUser />} />
        <Route path={path.editUser} element={<EditUser />} />
        <Route path={path.userInfo} element={<AgentManageUser />} />
        <Route path={path.recieveCash} element={<ReceiveCash />} />
        <Route path={path.payCash} element={<PayCash />} />
      </Route>
    </Routes>
  );
};
