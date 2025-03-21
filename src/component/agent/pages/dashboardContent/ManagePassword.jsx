import React from "react";
import style from "../styles/ManagePassword.module.css";
import { PasswordInput } from "../../../common/PasswordInput";
import { Button } from "../../../common/Button";
import { useParams } from "react-router-dom";
import { Loader } from "../../../common/Loader";
import { useAuth } from "../../../../context/jsx/AuthContext";
import { roles } from "../../../../utils/roles";
import { useState } from "react";
import { apiCall } from "../../../common/apiCall";
import { getToastTypes, showToast } from "../../../common/showToast";

export const ManagePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, finalId, selfChange) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Reset any existing error
    setLoading(true);

    const data = {
      currentPassword,
      newPassword,
      id: selfChange ? null : finalId,
    };

    console.log(data);

    try {
      let response;
      if (selfChange) {
        response = await apiCall(
          "/auth-api/client/change_password",
          "POST",
          data
        );
      } else {
        console.log("Yeah");
        response = await apiCall(
          `/auth-api/panel/changeUserPassword/${finalId}`,
          "POST",
          { ...data, confirmPassword: confirmPassword }
        );
      }

      const { uniqueCode } = response;
      console.log(response);

      if (uniqueCode === "CGP0074" || uniqueCode === "CGP0077") {
        console.log("Password changed successfully");
        const successMsg = selfChange
          ? "Your Password changed successfully"
          : "Password changed successfully for " + finalId;
        showToast(getToastTypes.type1, successMsg);
      } else {
        console.log(response);
        showToast(getToastTypes.type4, response.message);
      }
    } catch (err) {
      console.error("Error occurred during password change:", err);
      showToast(
        getToastTypes.type4,
        err.message || "Error occurred during password change"
      );
      setError(err.message || "An error occurred while changing password.");
    } finally {
      setLoading(false);
    }
  };

  const { id } = useParams();
  console.log("DDDD", id)

  const user = useAuth();
  const { userId, userRole } = user.user;

  let finalId = id;
  let selfChange = false;

  if (id === ":id") {
    selfChange = true; // handle self password change for Agent
    finalId = userId;
    if (roles.ADMIN === userRole) {
      // TODO : Password Change Request for some client based on ClientId via Agent
      console.log(
        "Password Change Request for for Loged in Admin (API not Implemented)"
      );
    }
  } else {
    if (roles.CLIENT === userRole) {
      // Change Request for client from Client Panel
      selfChange = true;
    } else {
      finalId = id;
    }
  }

  return (
    <div className={style.container}>
      {loading ? (
        <div>
          <Loader /> {/* Display the Loader while loading */}
        </div>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
          <h2 className={style.title}>
            {selfChange ? "Change Password" : `Change Password for ${finalId}`}
          </h2>
          
          <PasswordInput
            placeholder={selfChange ? "Current Password" : "Your Password"}
            onChange={(value) => {
              setError("");
              setCurrentPassword(value);
            }}
          />
          <PasswordInput
            placeholder="New Password"
            onChange={(value) => {
              setError("");
              setNewPassword(value);
            }}
          />
          <PasswordInput
            placeholder="Confirm New Password"
            onChange={(value) => {
              setError("");
              setConfirmPassword(value);
            }}
          />
          {error && <p className={style.error}>{error}</p>}
          <Button
            label="Change Password"
            onClick={(e) => handleSubmit(e, finalId, selfChange)}
            className={style.submitButton}
          />
        </form>
      )}
    </div>
  );
};
