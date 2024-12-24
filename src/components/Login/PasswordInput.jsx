import style from "./styles/LoginPage.module.css";
const PasswordInput = () => {
  return (
    <input type="password" className={style.input} placeholder="Password" />
  );
};

export default PasswordInput;
