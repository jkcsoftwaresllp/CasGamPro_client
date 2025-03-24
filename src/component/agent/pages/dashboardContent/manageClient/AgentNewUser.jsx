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
  const [initialInfo, setInitalInfo] = useState([]);
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
          maxShare: 0,
          maxLotteryCommission: 0,
          maxCasinoCommission: 0,
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
      maxShare: initialInfo.maxShare,
      userLotteryCommission: initialInfo.maxLotteryCommission,
      userCasinoCommission: initialInfo.maxCasinoCommission,
      password: "",
      confirmPassword: "",
    });
  }, [initialInfo]);

  const handleChange = (e) => {
    if (!e.target) {
      //  Special Case for Paswords
      const { name, value } = e;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    const { name, value } = e.target;
    setError("");

    const parsedValue =
      name === "fixLimit" ||
      name === "maxShare" ||
      name === "userCasinoCommission" ||
      name === "userLotteryCommission"
        ? value === ""
          ? ""
          : parseFloat(value)
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
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
        placeholder="Enter First Name"
      />
      <TextInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter Last Name"
      />
      <NumberInput
        label="Fix Limit"
        name="fixLimit"
        value={formData.fixLimit}
        onChange={handleChange}
        placeholder="Enter Fix Limit"
      />
      <NumberInput
        label="My Share"
        name="maxShare"
        value={formData.maxShare}
        onChange={handleChange}
        placeholder="Enter My Match Share"
        disable={true}
      />
      <NumberInput
        label="User Casino Commission"
        name="userCasinoCommission"
        value={formData.userCasinoCommission}
        onChange={handleChange}
        placeholder="Enter User Match Commission"
        disable={true}
      />
      <NumberInput
        label="User Lottery Commission"
        name="userLotteryCommission"
        value={formData.userLotteryCommission}
        onChange={handleChange}
        placeholder="Enter User Session Commission"
        disable={true}
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
