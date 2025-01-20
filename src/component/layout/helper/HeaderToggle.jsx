import { useState, useEffect } from "react";
import style from "../style/HeaderToggle.module.css";

export const HeaderToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
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

  return (
    <label className={style.switch}>
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <span className={style.slider}></span>
    </label>
  );
};
