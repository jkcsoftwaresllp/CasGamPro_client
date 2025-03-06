import style from "../styles/Tab.module.css";

export const Tab = ({ icon, onClick, title, isMinimized }) => {
  return (
    <div
      className={style.tab}
      onClick={onClick} // Triggered on click
    >
      <div>
        {typeof icon === "string" ? <img src={icon} alt={title} /> : icon}
      </div>
      {!isMinimized && <span>{title}</span>}
    </div>
  );
};
