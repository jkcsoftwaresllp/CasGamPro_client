import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext"; // Import UserContext
import style from "./style/HeaderMain.module.css";
import { HeaderHelper } from "./helper/HeaderHelper";
import { Unauth } from "./helper/Unauth";
import { Auth } from "./helper/Auth";

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Consume UserContext

  // On mount, check the user's previous theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Handle click on login icon
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleHomeClick = () => {
    navigate("/");
  };

  // Handle click on user icon (if logged in)
  const handleUserClick = () => {
    navigate("/profile"); // Or wherever you want the user to go
  };

  return (
    <header className={style.headerWrapper}>
      <div className={style.header}>
        <h1 className={style.header__title} onClick={handleHomeClick}>
          Header
        </h1>
        <div className={style.fullSection}>
          <HeaderHelper panel="client" />
        </div>

        <div className={style.rightSection}>
          {!user.isAuthenticated ? (
            <Unauth handleLoginClick={handleLoginClick} style={style} />
          ) : (
            <Auth handleUserClick={handleUserClick} style={style} />
          )}

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
