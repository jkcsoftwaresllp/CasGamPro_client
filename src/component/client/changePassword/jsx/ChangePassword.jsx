import React, { useState } from "react";
import style from "../style/Form.module.css";
import { PasswordInput } from "../../../common/PasswordInput";
import { TextInput } from "../../../common/TextInput";
import { Button } from "../../../common/Button";
import { Loader } from "../../../common/Loader";

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

      await new Promise((resolve) => setTimeout(resolve));

      console.log("Password changed successfully:", {
        currentPassword,
        newPassword,
      });

      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      {loading ? ( // Step 2: Show loader conditionally
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
