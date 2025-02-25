import React from "react";
import style from "../styles/ManagePassword.module.css";
import { PasswordInput } from "../../../common/PasswordInput";
import { TextInput } from "../../../common/TextInput";
import { Button } from "../../../common/Button";
import { useParams } from "react-router-dom";
import { Loader } from "../../../common/Loader";
import { useChangePassword } from "./helper/managePassword"; // Import the helper

export const ManagePassword = () => {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  } = useChangePassword(); // Use the helper hook
  const { id } = useParams();

  console.log(id);

  if(id === ":id") {
    // TODO : Password Change Request for Loged in Agent
  }else {
    // TODO : Password Change Request for some client based on ClientId via Agent

  }

  return (
    <div className={style.container}>
      {loading ? (
        <div>
          <Loader /> {/* Display the Loader while loading */}
        </div>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
          <h2 className={style.title}>Change Password for {id}</h2>
          <TextInput
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
