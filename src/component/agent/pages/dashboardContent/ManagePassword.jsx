import React, { useEffect } from "react";
import style from "../styles/ManagePassword.module.css";
import { PasswordInput } from "../../../common/PasswordInput";
import { Button } from "../../../common/Button";
import { useParams } from "react-router-dom";
import { Loader } from "../../../common/Loader";
import { useAuth } from "../../../../context/jsx/AuthContext";
import { roles } from "../../../../utils/roles";
import { useState } from "react";
import { apiCall } from "../../../common/apiCall";

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
      const response = await apiCall(
        "/auth-api/client/change_password",
        "POST",
        data
      );

      const { uniqueCode } = response;

      if (uniqueCode === "CGP0029") {
        console.log("Password changed successfully");
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error("Error occurred during password change:", err);
      setError("An error occurred while changing password.");
    } finally {
      setLoading(false);
    }
  };

  const { id } = useParams();

  const user = useAuth();
  const { userId, userRole } = user.user;

  console.log({ id, userId, userRole });
  let finalId = id;
  let selfChange = false;

  if (id === ":id") {
    selfChange = true;
    finalId = userId;
    if (roles.AGENT === userRole) {
      // TODO : Password Change Request for Loged in Agent
    } else if (roles.CLIENT === userRole) {
      // TODO : Password Change Request for some client based on ClientId via Agent
      console.log(
        "Password Change Request for Loged in Cliet (API not Implemented)"
      );
    } else if (roles.ADMIN === userRole) {
      // TODO : Password Change Request for some client based on ClientId via Agent
      console.log(
        "Password Change Request for for Loged in Admin (API not Implemented)"
      );
    }

    // TODO : Password Change Request for Loged in Agent
  } else {
    // TODO : Password Change Request for some client based on ClientId via Agent
    finalId = id;
    console.log(
      "Password Change Request for some client based on ClientId via Agent (API not Implemented)"
    );
  }

  return (
    <div className={style.container}>
      {loading ? (
        <div>
          <Loader /> {/* Display the Loader while loading */}
        </div>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
          <h2 className={style.title}>Change Password for {finalId}</h2>

          <PasswordInput
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
            onClick={(e) => handleSubmit(e, finalId, selfChange)}
            className={style.submitButton}
          />
        </form>
      )}
    </div>
  );
};
