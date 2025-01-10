import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { UsernameInput } from "../components/Common/UserNameInput";
import { PasswordInput } from "../components/Common/PasswordInput";
import { Button } from "../components/Common/Button";
import { apiCall } from "../components/Common/apiCall.js";
import style from "../components/Login/styles/LoginPage.module.css";

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext); // Access the context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validate input fields
    if (!userId || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      // Send login data to the backend
      const response = await apiCall("/api/auth/login", "POST", {
        userId,
        password,
      });

      if (response.status === "success") {
        // Store user details in context
        setUser({
          role: response.user.role,
          isAuthenticated: true,
        });

        // Navigate based on role
        if (response.user.role === "agent") {
          navigate("/agent");
        } else if (response.user.role === "player") {
          navigate("/game");
        }
      } else {
        setError(response.message || "Login failed");
      }
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
