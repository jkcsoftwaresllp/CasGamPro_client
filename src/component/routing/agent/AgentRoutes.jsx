import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { AgentDashboard } from "../../agent/pages/AgentDashboard";
import { ManageClients } from "../../agent/pages/dashboardContent/ManageClient";
import { ManagePassword } from "../../agent/pages/dashboardContent/ManagePassword";
import { Settings } from "../../agent/pages/dashboardContent/Setting";

export const AgentRoutes = () => {
  return (
    <Routes>
      <Route path={`${path.home}/*`} index element={<AgentDashboard />} />

      <Route
        path="*"
        element={
          <ErrorPage
            errorCode="ERR404"
            errorMessage="The page you are looking for does not exist."
          />
        }
      />
    </Routes>
  );
};
