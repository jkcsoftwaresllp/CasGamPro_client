import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles/HeaderMain.module.css";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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

  return (
    <header className={style.header}>
      <h1 className={style.header__title} onClick={handleHomeClick}>
        Header
      </h1>
      <div className={style.rightSection}>
        {/* <img
          src=""
          alt="Login"
          className={style.loginIcon}
          onClick={handleLoginClick}
          title="Login"
        /> */}
        <label className={style.switch}>
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className={style.slider}></span>
        </label>
      </div>
    </header>
  );
};

export default Header;
