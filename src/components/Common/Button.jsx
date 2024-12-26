import style from "./style/Button.module.css";

const Button = ({ label, onClick }) => {
  return (
    <button type="button" className={style.btn} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
