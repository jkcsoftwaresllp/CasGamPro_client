import style from "../style/HeaderToggle.module.css";

export const HeaderToggle = ({ isDarkMode, setIsDarkMode }) => {
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
