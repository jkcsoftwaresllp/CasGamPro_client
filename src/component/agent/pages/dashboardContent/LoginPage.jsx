import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { UsernameInput } from "../../../common/UserNameInput.jsx";
import { PasswordInput } from "../../../common/PasswordInput.jsx";
import { Button } from "../../../common/Button.jsx";
import { apiCall } from "./manageClient/helper/apiCall.js";
import style from "../styles/LoginPage.module.css";
import { Loader } from "../../../common/Loader.jsx";

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Show loader

    // Validate input fields
    if (!userId || !password) {
      setError("Both fields are required");
      setLoading(false); // Hide loader if validation fails
      return;
    }

    try {
      // Send login data to the backend
      const response = await apiCall("/api/login", "POST", {
        userId,
        password,
      });

      if (response.status === "success") {
        const userRole = response.user.role;

        // Navigate based on user role
        if (userRole === "agent") {
          navigate("/agent"); // Redirect to /dashboard if agent
        } else if (userRole === "client") {
          navigate("/game"); // Redirect to /game if client
        } else {
          setError("Unknown user role");
        }
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid username or password");
    } finally {
      setLoading(false); // Hide loader when API call is complete
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
            <Button label="Login" onClick={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
};
