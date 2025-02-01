import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserIdInput } from "../../../main/jsx/inputFeild/UserId";
import { TextInput } from "../../../main/jsx/inputFeild/TextInput";
import { NumberInput } from "../../../main/jsx/inputFeild/NumberInput";
import { PasswordInput } from "../../../main/jsx/inputFeild/PasswordInput";
import { Button } from "../../../../common/Button";
import { BlockSwitch } from "./BlockSwitch";
import style from "../manageClient/style/AgentNewUser.module.css";
import { Loader } from "../../../../common/Loader";
import { useFetchUserData } from "../helper/editUser"; // Import the helper function

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    formData,
    error,
    loading,
    handleChange,
    handleSwitchChange,
    handleSubmit,
  } = useFetchUserData(id); // Using helper hook

  const [success, setSuccess] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSubmit(id, formData);
    if (result.success) {
      setSuccess(result.success);
      setTimeout(() => navigate(-1)); // Redirect after success
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form className={style.form}>
          <h2 className={style.para}>Edit User : {id}</h2>

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
            <Button label="Save Changes" onClick={handleFormSubmit} />
          </div>
        </form>
      )}
    </>
  );
};
