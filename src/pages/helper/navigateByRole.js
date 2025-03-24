import { routesPathClient as path } from "../../component/routing/helper/routesPathClient.js";
import { roles } from "../../utils/roles.js";

export const navigateByRole = (role, navigate) => {
  const roleRoutes = {
    [roles.CLIENT]: path.client,
    [roles.AGENT]: path.agent,
    [roles.SUPERAGENT]: path.superagent,
    [roles.ADMIN]: path.admin,
    // Add more roles as needed in the future
  };

  const route = roleRoutes[role];
  if (route) {
    navigate(route);
  } else {
  }
};
