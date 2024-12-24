import style from "./styles/Sidetab.module.css";

export const SideTab = ({ onClick, title }) => {
  return (
    <div className={style.sideTab} onClick={onClick}>
      {title}
    </div>
  );
};
