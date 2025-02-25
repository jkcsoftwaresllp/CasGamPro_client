import { useState } from "react";
import { apiCall } from "../../../../common/apiCall";

export const useChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Reset any existing error
    setLoading(true);

    try {
      const response = await apiCall(
        "/auth-api/client/change_password", // Update API path as needed
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
    } catch (err) {
      console.error("Error occurred during password change:", err);
      setError("An error occurred while changing password.");
    } finally {
      setLoading(false);
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  };
};
