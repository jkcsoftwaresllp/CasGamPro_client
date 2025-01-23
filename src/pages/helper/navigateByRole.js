import { roles } from "../../utils/roles.js";

export const navigateByRole = (role, navigate) => {
  const roleRoutes = {
    [roles.AGENT]: "/agent",
    [roles.CLIENT]: "/client",
    // Add more roles as needed in the future
  };

  const route = roleRoutes[role];
  if (route) {
    navigate(route);
  } else {
  }
};
