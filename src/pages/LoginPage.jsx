import UsernameInput from "../components/Login/UsernameInput";
import PasswordInput from "../components/Login/PasswordInput";
import LoginButton from "../components/Login/LoginButton";
import style from "../components/Login/styles/LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <div className={style.form_container}>
          <div className={style.form_details}>Login</div>
          <UsernameInput />
          <PasswordInput />
          <LoginButton />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
