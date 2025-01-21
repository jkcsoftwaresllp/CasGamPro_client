import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsernameInput } from "../../../common/UserNameInput.jsx";
import { PasswordInput } from "../../../common/PasswordInput.jsx";
import { Button } from "../../../common/Button.jsx";
import style from "../styles/LoginPage.module.css";
import { Loader } from "../../../common/Loader.jsx";
import { useAuth } from "../../../../context/jsx/AuthContext.jsx";

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, handleLogin, loading } = useAuth();

  const handleLoginFun = async (e) => {
    e.preventDefault();
    setError("");

    // Input validation
    if (!userId.trim() || !password.trim()) {
      setError("Both fields are required");
      return;
    }

    await handleLogin({ userId, password });

    const { userRole } = user;

    // Navigate based on role
    if (role === "AGENT") {
      navigate("/agent");
    } else if (role === "CLIENT") {
      navigate("/client");
    } else {
      setError("Unknown user role");
    }
  };

  return (
    <div className={style.container}>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.form}>
          <div className={style.form_container}>
            <div className={style.form_details}>Login</div>
            <UsernameInput onChange={setUserId} />
            <PasswordInput onChange={setPassword} />
            {error && <div className={style.error}>{error}</div>}{" "}
            <Button label="Login" onClick={handleLoginFun} />
          </div>
        </div>
      )}
    </div>
  );
};
