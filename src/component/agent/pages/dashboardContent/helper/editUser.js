import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";
import { getToastTypes, showToast } from "../../../../common/showToast";

export const useFetchUserData = (id) => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    fixLimit: 0,
    share: 0,
    casinoCommission: 0,
    lotteryCommission: 0,
    password: "",
    confirmPassword: "",
    blockingLevels: "NONE",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiCall(`/auth-api/panel/user/${id}`, "GET");
        console.log("User data fetched successfully:", response);

        if (response.uniqueCode === "CGP0113") setFormData(response.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    if (typeof e !== "object") return;

    const { name, value } = e.target || e; // Handles both input & password cases
    if (!name) return;

    setError(""); // Ensure error state resets

    // Store raw input value as a string
    let rawValue = value;

    // Convert to float only if needed (excluding empty value)
    let parsedValue = rawValue === "" ? "" : Number(rawValue);

    // Ensure parsedValue does not turn NaN
    if (isNaN(parsedValue)) parsedValue = "";

    // Get max limits
    const maxLotteryCommission = 40,
      maxCasinoCommission = 40;

    setFormData((prev) => {
      let finalValue = rawValue; // Keep the original value for correct display

      if (
        ["fixLimit", "share", "casinoCommission", "lotteryCommission"].includes(
          name
        )
      ) {
        finalValue = parsedValue;
      }

      // Apply limits
      if (name === "share" && parsedValue > 100) {
        finalValue = prev.share; // Prevent exceeding 100
      } else if (
        name === "casinoCommission" &&
        parsedValue > parseFloat(maxCasinoCommission)
      ) {
        finalValue = prev.casinoCommission; // Enforce max casino commission
      } else if (
        name === "lotteryCommission" &&
        parsedValue > parseFloat(maxLotteryCommission)
      ) {
        finalValue = prev.lotteryCommission; // Enforce max lottery commission
      }

      return prev[name] === finalValue ? prev : { ...prev, [name]: finalValue };
    });
  };

  const handleDropdownChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      blockingLevels: value,
    }));
  };

  const handleSubmit = async (id, formData) => {
    console.log("Form Data: ", formData);
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        showToast(getToastTypes.type4, "Passwords do not match.");
        return;
      }

      const response = await apiCall(
        `/auth-api/panel/users/${id}`,
        "PUT",
        formData
      );

      console.log("API Response: ", response);

      return { success: "User updated successfully!" };
    } catch (err) {
      console.error("Update error:", err);
      return {
        error:
          err.response?.data?.message || "An error occurred while updating.",
      };
    }
  };

  const blockOptions = [
    { name: "Comletely Blocked", value: "LEVEL_1" },
    { name: "Cannot Place bets", value: "LEVEL_2" },
    { name: "Cannot play Games", value: "LEVEL_3" },
    { name: "Can do anything", value: "NONE" },
  ];

  const getNameByValue = (value) => {
    const option = blockOptions.find((item) => item.value === value);
    return option ? option.name : "Unknown";
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    handleDropdownChange,
    handleSubmit,
    blockOptions,
    getNameByValue,
  };
};
