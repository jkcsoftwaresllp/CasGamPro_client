import { Routes, Route } from "react-router-dom";
import { Home } from "../../../pages/jsx/Home";
import { ProtectedRoutes } from "../helper/ProtectedRoutes";
import { LoginPage } from "../../../pages/jsx/LoginPage";
import { roles } from "../../../utils/roles";
import { ClientRoutes } from "../../routing/client/ClientRoutes";
import { ErrorPage } from "../../../pages/jsx/Error";
import { routesPathClient } from "../../routing/helper/routesPathClient";
import { PanelRoutes } from "../../routing/panel/PanelRoutes";

/***
 * 
 * 
 * Working Here : Arraning All the Panels & Checking Breaking Apth
 * 
 * 
 * 
 * 
 */

export const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />

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
            children={<PanelRoutes role={roles.AGENT} />}
          />
        }
      />

      <Route
        path={`${routesPathClient.superagent}/*`}
        element={
          <ProtectedRoutes
            allowedRoles={[roles.SUPERAGENT]}
            children={<PanelRoutes role={roles.SUPERAGENT} />}
          />
        }
      />

      <Route
        path={`${routesPathClient.admin}/*`}
        element={
          <ProtectedRoutes
            allowedRoles={[roles.ADMIN]}
            children={<PanelRoutes role={roles.ADMIN} />}
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
