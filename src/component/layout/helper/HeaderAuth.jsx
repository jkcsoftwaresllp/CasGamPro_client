import { useContext } from "react";
import { loginIcon, logoutIcon } from "../../../assets/assets";
import { UserContext } from "../../../context/userContext/UserContext";
import { SetIcon } from "../../common/jsx/SetIcon";
import { useNavigate } from "react-router-dom";

export const HeaderAuth = () => {
  const navigate = useNavigate();
  const { userContext } = useContext(UserContext);

  // Navigation handlers
  const handleLoginClick = () => navigate("/login");
  const handleLogoutClick = () => navigate("/login");

  // Conditionally render user actions
  return !userContext?.isAuthenticated ? (
    <SetIcon onClick={handleLoginClick} icon={loginIcon} />
  ) : (
    <SetIcon onClick={handleLogoutClick} icon={logoutIcon} />
  );
};
