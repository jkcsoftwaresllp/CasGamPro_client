import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiCall } from "../../../../common/apiCall";
import { UserIdInput } from "../../../main/jsx/inputFeild/UserId";
import { TextInput } from "../../../main/jsx/inputFeild/TextInput";
import { NumberInput } from "../../../main/jsx/inputFeild/NumberInput";
import { PasswordInput } from "../../../main/jsx/inputFeild/PasswordInput";
import { Button } from "../../../../common/Button";
import { BlockSwitch } from "./BlockSwitch";
import style from "../manageClient/style/AgentNewUser.module.css";
import { Loader } from "../../../../common/Loader";

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    agentBlocked: false,
    betsBlocked: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await apiCall(`/api/users/${id}`, "GET");
        setFormData(response.data);
        setLoading(false); // Stop loading when data is fetched
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
        setLoading(false); // Stop loading even if error occurs
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await apiCall(`/api/users/${id}`, "PUT", formData);
      setSuccess("User updated successfully!");
      setTimeout(() => navigate(-1));
    } catch (err) {
      console.error("Update error:", err);
      setError(
        err.response?.data?.message || "An error occurred while updating."
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form className={style.form}>
          <h2 className={style.para}>Edit User : {id}</h2>
          <UserIdInput value={formData.userId} disabled />
          <TextInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <NumberInput
            label="Fix Limit"
            name="fixLimit"
            value={formData.fixLimit}
            onChange={handleChange}
            min={0}
            max={18}
          />
          <NumberInput
            label="My Match Share"
            name="myMatchShare"
            value={formData.myMatchShare}
            onChange={handleChange}
            min={0}
            max={15}
          />
          <NumberInput
            label="User Match Commission"
            name="userMatchCommission"
            value={formData.userMatchCommission}
            onChange={handleChange}
            min={0}
            max={3}
          />
          <NumberInput
            label="User Session Commission"
            name="userSessionCommission"
            value={formData.userSessionCommission}
            onChange={handleChange}
            min={0}
            max={3}
          />

          <div className={style.switchArea}>
            <BlockSwitch
              label="Agent Blocked"
              id="agentBlockedSwitch"
              isChecked={formData.agentBlocked}
              setIsChecked={(value) =>
                handleSwitchChange("agentBlocked", value)
              }
            />
          </div>

          <div className={style.switchArea}>
            <BlockSwitch
              label="Bets Blocked"
              id="betsBlockedSwitch"
              isChecked={formData.betsBlocked}
              setIsChecked={(value) => handleSwitchChange("betsBlocked", value)}
            />
          </div>

          {error && <div className={style.error}>{error}</div>}
          {success && <div className={style.success}>{success}</div>}

          <div className={style.buttonArea}>
            <Button label="Cancel" onClick={() => navigate(-1)} />
            <Button label="Save Changes" onClick={handleSubmit} />
          </div>
        </form>
      )}
    </>
  );
};
