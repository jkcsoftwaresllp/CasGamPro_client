import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style/HeaderMain.module.css";

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
        <img
          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='grey'><path d='M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z'/></svg>"
          alt="Login"
          className={style.loginIcon}
          onClick={handleLoginClick}
          title="Login"
        />

        <label className={style.switch}>
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className={style.slider}></span>
        </label>
      </div>
    </header>
  );
};

export default Header;
