import React, { useState } from "react";
import style from "../style/Form.module.css";
import { PasswordInput } from "../../../common/PasswordInput";
import { TextInput } from "../../../common/TextInput";
import { Button } from "../../../common/Button";
import { Loader } from "../../../common/Loader";
import { apiCall } from "../../../common/apiCall";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      setLoading(true);

      const response = await apiCall(
        "/auth-api/client/change_password",
        "POST",
        {
          currentPassword,
          newPassword,
        }
      );

      const { uniqueCode } = response;

      if (uniqueCode === "CGP0029") {
        console.log("Password changed successfully");
      } else {
        console.log(response);
      }

      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
          <h2 className={style.title}>Change Password</h2>
          <TextInput
            placeholder="Current Password"
            onChange={setCurrentPassword}
          />
          <PasswordInput placeholder="New Password" onChange={setNewPassword} />
          <PasswordInput
            placeholder="Confirm New Password"
            onChange={setConfirmPassword}
          />
          {error && <p className={style.error}>{error}</p>}
          <Button
            label="Change Password"
            onClick={handleSubmit}
            className={style.submitButton}
          />
        </form>
      )}
    </div>
  );
};
