import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import LoginButton from "../components/LoginButton";
import "../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="container">
      <form className="form">
        <div className="form_front">
          <div className="form_details">Login</div>
          <UsernameInput />
          <PasswordInput />
          <LoginButton />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
