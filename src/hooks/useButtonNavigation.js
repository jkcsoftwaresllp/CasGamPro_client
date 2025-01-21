import { useNavigate, useLocation } from "react-router-dom";

export const useButtonNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handler for button clicks
  const handleNavigation = (relativePath) => {
    const basePath = location.pathname.replace(/\/$/, ""); // Remove trailing slash
    navigate(`${basePath}${relativePath}`);
  };

  return handleNavigation;
};

/*

Use it:

  const handleNavigation = useButtonNavigation();


*/
