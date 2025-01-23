import React, { useState } from "react";
import style from "../style/Form.module.css";
import { PasswordInput } from "../../../common/PasswordInput";
import { TextInput } from "../../../common/TextInput";
import { Button } from "../../../common/Button";
import { Loader } from "../../../common/Loader";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Step 1: Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      setLoading(true); // Start loading

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle the password reset logic here
      console.log("Password changed successfully:", {
        oldPassword,
        newPassword,
      });

      setLoading(false); // Stop loading
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
          <TextInput placeholder="Old Password" onChange={setOldPassword} />
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
