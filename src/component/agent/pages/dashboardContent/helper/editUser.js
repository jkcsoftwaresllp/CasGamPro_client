import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

export const useFetchUserData = (id) => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    fixLimit: 0,
    matchShare: 0,
    matchCommission: 0,
    lotteryCommission: 0,
    password: "",
    confirmPassword: "",
    agentBlocked: false,
    betsBlocked: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiCall(`/auth-api/agent/players/${id}`, "GET");
        console.log("User data fetched successfully:", response.data.client);
        setFormData(response.data.client);
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
    const { name, value } = e.target;
    const parsedValue = [
      "fixLimit",
      "matchShare",
      "matchCommission",
      "lotteryCommission",
    ].includes(name)
      ? parseFloat(value)
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSwitchChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (id, formData) => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      await apiCall(`/auth-api/agent/players/${id}`, "PUT", formData);
      return { success: "User updated successfully!" };
    } catch (err) {
      console.error("Update error:", err);
      return {
        error:
          err.response?.data?.message || "An error occurred while updating.",
      };
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    handleSwitchChange,
    handleSubmit,
  };
};
