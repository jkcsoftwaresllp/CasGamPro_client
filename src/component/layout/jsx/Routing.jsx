import { Routes, Route } from "react-router-dom";
import { Home } from "../../../pages/jsx/Home";
import { ProtectedRoutes } from "../helper/ProtectedRoutes";
import { LoginPage } from "../../../pages/jsx/LoginPage";
import { roles } from "../../../utils/roles";
import { ClientRoutes } from "../../routing/client/ClientRoutes";
import { AgentRoutes } from "../../routing/agent/AgentRoutes";
import { ErrorPage } from "../../../pages/jsx/Error";
import { routesPathClient } from "../../routing/helper/routesPathClient";
import { Test } from "../helper/Test";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />

      {/* Protected routes */}
      <Route
        path={`${routesPathClient.client}/*`}
        element={
          <ProtectedRoutes
            allowedRoles={[roles.CLIENT]}
            children={<ClientRoutes />}
          />
        }
      />

      <Route
        path={`${routesPathClient.agent}/*`}
        element={
          <ProtectedRoutes
            allowedRoles={[roles.AGENT]}
            children={<AgentRoutes />}
          />
        }
      />

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
