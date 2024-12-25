import { useState, useEffect } from "react";
import style from "./styles/HeaderMain.module.css";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

    // Save the theme preference in localStorage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className={style.header}>
      <h1 className={style.header__title}>Header</h1>
      <label className={style.switch}>
        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className={style.slider}></span>
      </label>
    </header>
  );
};

export default Header;
