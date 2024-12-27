import React, { useState } from "react";
import UsernameInput from "../components/Common/UserNameInput";
import PasswordInput from "../components/Common/PasswordInput";
import Button from "../components/Common/Button";
import { apiCall } from "../components/Common/apiCall.js";
import style from "../components/Login/styles/LoginPage.module.css";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Clicked")

    // Validate input fields
    if (!userId || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      // Send login data to the backend
      const response = await apiCall("/api/login", "POST", {
        userId,
        password,
      });

      console.log("Login Successful:", response);
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.form_container}>
          <div className={style.form_details}>Login</div>
          <UsernameInput onChange={setUserId} />
          <PasswordInput onChange={setPassword} />
          {error && <div className={style.error}>{error}</div>}{" "}
          {/* Display error */}
          <Button label="Login" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
