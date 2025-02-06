import style from "./style/CustomBtn.module.css";

export const CustomBtn = ({ label, onClick }) => {
  return (
    <button type="button" className={style.btn} onClick={onClick}>
      {label}
    </button>
  );
};
