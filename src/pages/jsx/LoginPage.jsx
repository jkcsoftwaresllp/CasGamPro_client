import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsernameInput } from "../../component/common/UserNameInput.jsx";
import { PasswordInput } from "../../component/common/PasswordInput.jsx";
import { Button } from "../../component/common/Button.jsx";
import style from "../styles/LoginPage.module.css";
import { Loader } from "../../component/common/Loader.jsx";
import { useAuth } from "../../context/jsx/AuthContext.jsx";
import { navigateByRole } from "../helper/navigateByRole.js";
import { getToastTypes, showToast } from "../../component/common/showToast.jsx";

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, handleLogin, loading } = useAuth();

  // Redirect after login
  useEffect(() => {
    if (user?.userRole) {
      navigateByRole(user.userRole, navigate, setError);
    }
  }, [user, navigate]);

  const handleLoginFun = async (e) => {
    e.preventDefault();
    setError("");

    // Input validation
    if (!userId.trim() || !password.trim()) {
      showToast(getToastTypes.type4, "Both fields are required");
      return;
    }

    try {
      await handleLogin({ userId, password });
    } catch (err) {
      showToast(getToastTypes.type4, error);
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
            <UsernameInput value={userId} onChange={setUserId} />
            <PasswordInput value={password} onChange={setPassword} />
            {error && <div className={style.error}>{error}</div>}
            <Button label="Login" onClick={handleLoginFun} />
          </div>
        </div>
      )}
    </div>
  );
};
