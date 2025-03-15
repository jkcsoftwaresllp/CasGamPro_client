import { Routes, Route } from "react-router-dom";
import { ErrorPage } from "../../../pages/jsx/Error";
import { panelRoutesConfig } from "../../layout/helper/panelRoutesConfig";

export const PanelRoutes = ({ role }) => {
  const panelConfig = panelRoutesConfig[role];

  if (!panelConfig) {
    return <ErrorPage errorCode="ERR403" errorMessage="Unauthorized Access" />;
  }

  return (
    <Routes>
      <Route path="/" element={<panelConfig.dashboard />}>
        {panelConfig.routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Route>

      {/* Catch-all route for 404 errors */}
      <Route
        path="*"
        element={
          <ErrorPage
            errorCode="ERR404"
            errorMessage={`${role.toUpperCase()} Panel - The page you are looking for does not exist.`}
          />
        }
      />
    </Routes>
  );
};
