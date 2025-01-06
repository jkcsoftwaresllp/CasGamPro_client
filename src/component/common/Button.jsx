import style from "./style/Button.module.css";

export const Button = ({ label, onClick }) => {
  return (
    <button type="button" className={style.btn} onClick={onClick}>
      {label}
    </button>
  );
};
