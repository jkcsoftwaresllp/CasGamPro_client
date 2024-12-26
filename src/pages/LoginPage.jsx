import UsernameInput from "../components/Common/UserNameInput";
import PasswordInput from "../components/Common/PasswordInput";
import Button from "../components/Common/Button";

import style from "../components/Login/styles/LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <div className={style.form_container}>
          <div className={style.form_details}>Login</div>
          <UsernameInput />
          <PasswordInput />
          <Button label="Login" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
