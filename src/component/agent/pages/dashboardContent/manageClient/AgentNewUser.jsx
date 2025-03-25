import { useEffect, useState } from "react";
import { apiCall } from "./helper/apiCall"; // Import the reusable API call function
import { UserIdInput } from "../../../main/jsx/inputFeild/UserId";
import { TextInput } from "../../../main/jsx/inputFeild/TextInput";
import { NumberInput } from "../../../main/jsx/inputFeild/NumberInput";
import { PasswordInput } from "../../../main/jsx/inputFeild/PasswordInput";
import { Button } from "../../../../common/Button";
import style from "./style/AgentNewUser.module.css";
import { useNavigate } from "react-router-dom";

export const AgentNewUser = () => {
  const navigate = useNavigate();
  const [initialInfo, setInitalInfo] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    fixLimit: 0,
    maxShare: 0,
    userLotteryCommission: 0,
    userCasinoCommission: 0,
    password: "",
    confirmPassword: "",
  });

  const fetchData = async () => {
    try {
      const response = await apiCall("/auth-api/panel/generate-user-id", "GET");
      console.log("API Response: ", response);
      if (response && response.uniqueCode === "CGP0108") {
        setInitalInfo((prev) => ({
          ...prev,
          userId: response.data.userId,
          maxShare: response.data.maxShare,
          maxLotteryCommission: response.data.maxLotteryCommission,
          maxCasinoCommission: response.data.maxCasinoCommission,
        }));
      } else {
        console.error("API Error:", response.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setFormData({
      userId: initialInfo.userId,
      firstName: "",
      lastName: "",
      fixLimit: 0,
      maxShare: "",
      userLotteryCommission: 0,
      userCasinoCommission: 0,
      password: "",
      confirmPassword: "",
    });
  }, [initialInfo]);

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
    const { maxLotteryCommission, maxCasinoCommission } = initialInfo;

    setFormData((prev) => {
      let finalValue = rawValue; // Keep the original value for correct display

      if (
        [
          "fixLimit",
          "maxShare",
          "userCasinoCommission",
          "userLotteryCommission",
        ].includes(name)
      ) {
        finalValue = parsedValue;
      }

      // Apply limits
      if (name === "maxShare" && parsedValue > 100) {
        finalValue = prev.maxShare; // Prevent exceeding 100
      } else if (
        name === "userCasinoCommission" &&
        parsedValue > parseFloat(maxCasinoCommission)
      ) {
        finalValue = prev.userCasinoCommission; // Enforce max casino commission
      } else if (
        name === "userLotteryCommission" &&
        parsedValue > parseFloat(maxLotteryCommission)
      ) {
        finalValue = prev.userLotteryCommission; // Enforce max lottery commission
      }

      return prev[name] === finalValue ? prev : { ...prev, [name]: finalValue };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic password check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send form data to the backend
      const response = await apiCall(
        "/auth-api/panel/register-user",
        "POST",
        formData
      );

      console.log("Form submitted successfully:", response);

      if (response.uniqueCode === "CGP0011") {
        setSuccess("User registered successfully!");

        const timer = setTimeout(() => {
          fetchData();
          setError("");
          setSuccess(null);
        }, 3000);

        return () => clearTimeout(timer);
      } else {
        console.log("Backend Error:", response);
        setError(response?.message || "Registration failed.");
      }
    } catch (err) {
      console.log("Backend Error:", err);
      setError(err?.message || "An error occurred during registration.");
    }
  };

  return (
    <form className={style.form}>
      <UserIdInput value={formData.userId} onChange={handleChange} />
      <TextInput
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <TextInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <NumberInput
        label="Fix Limit"
        name="fixLimit"
        value={formData.fixLimit}
        onChange={handleChange}
        placeholder="Fix Limit"
      />
      <NumberInput
        label="My Share"
        name="maxShare"
        value={formData.maxShare}
        onChange={handleChange}
        placeholder="My Share"
        maxLimit={initialInfo.maxShare}
      />
      <NumberInput
        label="Casino Commission"
        name="userCasinoCommission"
        value={formData.userCasinoCommission}
        onChange={handleChange}
        placeholder="Match Commission"
        maxLimit={initialInfo.maxCasinoCommission}
      />
      <NumberInput
        label="Lottery Commission"
        name="userLotteryCommission"
        value={formData.userLotteryCommission}
        onChange={handleChange}
        placeholder="Session Commission"
        maxLimit={initialInfo.maxLotteryCommission}
      />
      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter Password"
      />
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
      />
      {error && <div className={style.error}>{error}</div>}{" "}
      {/* Display error */}
      {success && <div className={style.success}>{success}</div>}{" "}
      {/* Display success */}
      {!success && (
        <div className={style.btnGroup}>
          <Button label="Cancel" onClick={goBack} />
          <Button label="Save Changes" onClick={handleSubmit} />
        </div>
      )}
    </form>
  );
};
