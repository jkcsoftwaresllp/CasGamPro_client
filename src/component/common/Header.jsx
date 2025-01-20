import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext"; // Import UserContext
import style from "./style/HeaderMain.module.css";
import Icon from "./images/icon"; // Import Icon component

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { userContext } = useContext(UserContext); // Consume UserContext

  // Initialize theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme and save preference to localStorage
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Navigation handlers
  const handleLoginClick = () => navigate("/login");
  const handleHomeClick = () => navigate("/");
  const handleUserClick = () => navigate("/profile");

  // Conditionally render user actions
  const renderUserSection = () => {
    if (!userContext?.isAuthenticated) {
      return (
        <Icon type="login" size={24} onClick={handleLoginClick} title="Login" />
      );
    }

    return (
      <div className={style.balance}>
        <div className={style.coins}>
          <Icon type="coin" size={40} />
          <p>{userContext?.coins || 0}</p>
        </div>
        <div className={style.user} onClick={handleUserClick}>
          <Icon type="user" size={30} />
          <p>{userContext?.userID || "User"}</p>
        </div>
      </div>
    );
  };

  return (
    <header className={style.headerWrapper}>
      <div className={style.header}>
        <h1 className={style.header__title} onClick={handleHomeClick}>
          <img className={style.logo} src={logo} />
        </h1>
        <div className={style.fullSection}>
          <HeaderHelper panel={"client"} />
        </div>

        <div className={style.rightSection}>
          {renderUserSection()}
          <label className={style.switch}>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className={style.slider}></span>
          </label>
        </div>
      </div>
    </header>
  );
};
