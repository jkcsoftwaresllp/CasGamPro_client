import { useState, useEffect } from "react";
import { apiCall } from "../../../../common/apiCall";

export const useFetchUserData = (id) => {
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    fixLimit: 0,
    myMatchShare: 0,
    userMatchCommission: 0,
    userLotteryCommission: 0,
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
        setFormData((prev) => {
          return {
            ...prev,
            userId: response.data.client.id,
            firstName: response.data.client.firstName,
            lastName: response.data.client.lastName,
            fixLimit: response.data.client.fixLimit,
            myMatchShare: response.data.client.matchShare,
            userMatchCommission: response.data.client.userMatchCommission,
            userLotteryCommission: response.data.client.lotteryCommission,
            agentBlocked: response.data.client.agentBlocked,
            betsBlocked: response.data.client.betsBlocked,
          };
        });
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
      "myMatchShare",
      "userMatchCommission",
      "userSessionCommission",
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

      await apiCall(`/api/users/${id}`, "PUT", formData);
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
