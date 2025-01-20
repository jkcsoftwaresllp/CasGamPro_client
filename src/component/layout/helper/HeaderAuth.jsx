import { useContext } from "react";
import { loginIcon, logoutIcon } from "../../../assets/assets";
import { UserContext } from "../../../context/userContext/UserContext";

export const HeaderAuth = () => {
  const { userContext } = useContext(UserContext);

  // Navigation handlers
  const handleLoginClick = () => navigate("/login");
  const handleLogoutClick = () => navigate("/login");

  // Conditionally render user actions
  return !userContext?.isAuthenticated ? (
    <div onClick={handleLoginClick}>{loginIcon}</div>
  ) : (
    <div onClick={handleLogoutClick}>{logoutIcon}</div>
  );
};
