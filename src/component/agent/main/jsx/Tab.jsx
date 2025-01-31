import style from "../styles/Tab.module.css";

export const Tab = ({ icon, onClick, title }) => {
  return (
    <div
      className={style.tab}
      onClick={onClick} // Triggered on click
    >
      <div>
        {typeof icon === "string" ? <img src={icon} alt={title} /> : icon}
      </div>
      <span>{title}</span>
    </div>
  );
};
