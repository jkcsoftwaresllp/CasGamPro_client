import { useState } from "react";
import { apiCall } from "./helper/apiCall"; // Import the reusable API call function
import { UserIdInput } from "../../../main/jsx/inputFeild/UserId";
import { TextInput } from "../../../main/jsx/inputFeild/TextInput";
import { NumberInput } from "../../../main/jsx/inputFeild/NumberInput";
import { PasswordInput } from "../../../main/jsx/inputFeild/PasswordInput";
import { Button } from "../../../../common/Button";
import style from "./style/AgentNewUser.module.css";

export const AgentNewUser = () => {
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    fixLimit: 0,
    myMatchShare: 0,
    userMatchCommission: 0,
    userSessionCommission: 0,
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "fixLimit" ||
      name === "myMatchShare" ||
      name === "userMatchCommission" ||
      name === "userSessionCommission"
        ? parseFloat(value)
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
      const response = await apiCall("/api/register", "POST", formData);
      setSuccess("User registered successfully!");
      console.log("Form submitted successfully:", response);
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || "An error occurred during registration."
      );
    }
  };

  return (
    <form className={style.form}>
      <h2>New User</h2>
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
        min={0}
        max={18.0}
      />
      <NumberInput
        label="My Match Share"
        name="myMatchShare"
        value={formData.myMatchShare}
        onChange={handleChange}
        placeholder="Enter My Match Share"
        min={0}
        max={15} // Dynamic max based on fixLimit
      />
      <NumberInput
        label="User Match Commission"
        name="userMatchCommission"
        value={formData.userMatchCommission}
        onChange={handleChange}
        placeholder="Enter User Match Commission"
        min={0}
        max={3}
      />
      <NumberInput
        label="User Session Commission"
        name="userSessionCommission"
        value={formData.userSessionCommission}
        onChange={handleChange}
        placeholder="Enter User Session Commission"
        min={0}
        max={3}
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
      <div>
        <Button label="Cancel" />
        <Button label="Save Changes" onClick={handleSubmit} />
      </div>
    </form>
  );
};

