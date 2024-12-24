import style from "./styles/ClientRegister.module.css";

const Button = ({ label, onClick }) => (
  <button type="button" onClick={onClick} className={style.btn}>
    {label}
  </button>
);

export default Button;
