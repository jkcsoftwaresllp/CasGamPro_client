import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsernameInput } from "../../../common/UserNameInput.jsx";
import { PasswordInput } from "../../../common/PasswordInput.jsx";
import { Button } from "../../../common/Button.jsx";
import { apiCall } from "./manageClient/helper/apiCall.js";
import style from "../styles/LoginPage.module.css";
import { Loader } from "../../../common/Loader.jsx";
import { UserContext } from "../../../../context/userContext/UserContext.jsx"; // Adjust the path as needed

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { initializeContext } = useContext(UserContext); // Access UserContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    setLoading(true);

    // Input validation
    if (!userId.trim() || !password.trim()) {
      setError("Both fields are required");
      setLoading(false);
      return;
    }

    try {
      // Perform login API call
      const response = await apiCall("/api/login", "POST", {
        userId,
        password,
      });

      if (response?.status === "success") {
        const { role, userID } = response.user; // Extract role and userID

        // Initialize UserContext with the user's data
        initializeContext({
          userID,
          role,
          isAuthenticated: true,
          gameID: null,
          roundID: null,
        });

        // Navigate based on role
        if (role === "AGENT") {
          navigate("/agent");
        } else if (role === "CLIENT") {
          navigate("/game");
        } else {
          setError("Unknown user role");
        }
      } else {
        setError(response?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.form}>
          <div className={style.form_container}>
            <h2 className={style.form_details}>Login</h2>
            <UsernameInput
              onChange={(value) => setUserId(value)}
              value={userId}
            />
            <PasswordInput
              onChange={(value) => setPassword(value)}
              value={password}
            />
            {error && <div className={style.error}>{error}</div>}
            <Button label="Login" onClick={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
};
