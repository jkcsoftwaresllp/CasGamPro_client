import { loginIcon, logoutIcon } from "../../../assets/assets";
import { SetIcon } from "../../common/jsx/SetIcon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/jsx/AuthContext";

export const HeaderAuth = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  // Navigation handlers
  const handleLoginClick = () => navigate("/login");
  console.log(user);

  // Conditionally render user actions
  return !user ? (
    <SetIcon onClick={handleLoginClick} icon={loginIcon} />
  ) : (
    <SetIcon onClick={handleLogout} icon={logoutIcon} />
  );
};
