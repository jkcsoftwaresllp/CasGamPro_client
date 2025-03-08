import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserIdInput } from "../../../main/jsx/inputFeild/UserId";
import { TextInput } from "../../../main/jsx/inputFeild/TextInput";
import { NumberInput } from "../../../main/jsx/inputFeild/NumberInput";
import { PasswordInput } from "../../../main/jsx/inputFeild/PasswordInput";
import { Button } from "../../../../common/Button";
import style from "../manageClient/style/AgentNewUser.module.css";
import { Loader } from "../../../../common/Loader";
import { useFetchUserData } from "../helper/editUser"; // Import the helper function
import Dropdown from "../helper/Dropdown";
import { getToastTypes, showToast } from "../../../../common/showToast";

// TODO: Currently Blocking is not implmented neither at client side not return in API

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    formData,
    error,
    loading,
    handleChange,
    handleDropdownChange,
    handleSubmit,
    blockOptions,
    getNameByValue,
  } = useFetchUserData(id); // Using helper hook

  const [success, setSuccess] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSubmit(id, formData);

    if (result?.success) {
      setSuccess(result.success);
      showToast(getToastTypes.type1, result.success);

      // setTimeout(() => navigate(-1), 3000); // Redirect after success
    } else {
      showToast(getToastTypes.type4, result?.error || "Handling Form Error");
    }
  };

  const [dropdownLabel, setDropdownLabel] = useState(
    `Block Level: ${getNameByValue(formData.blockingLevels)}`
  );

  useEffect(() => {
    setDropdownLabel(`Block Level: ${getNameByValue(formData.blockingLevels)}`);
  }, [formData.blockingLevels]);

  const handleDropdownSelect = (selection) => {
    setDropdownLabel(`Block Level: ${selection.name}`);
    handleDropdownChange(selection.value);
  };

  return (
    <>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <form className={style.form}>
          <h2 className={style.para}>Edit User : {id}</h2>
          <UserIdInput value={formData.username} />
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
            disable={true}
          />
          <NumberInput
            label="My Share"
            name="share"
            value={formData.share}
            disable={true}
          />
          <NumberInput
            label="Casino Commission"
            name="casinoCommission"
            value={formData.casinoCommission}
            disable={true}
          />
          <NumberInput
            label="Lottery Commission"
            name="lotteryCommission"
            value={formData.lotteryCommission}
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

          <Dropdown
            options={blockOptions}
            onSelect={handleDropdownSelect}
            buttonLabel={dropdownLabel}
          />

          {error && <div className={style.error}>{error}</div>}
          {success && <div className={style.success}>{success}</div>}
          <div className={style.buttonArea}>
            <Button label="Cancel" onClick={() => navigate(-1)} />
            <Button label="Save Changes" onClick={(e) => handleFormSubmit(e)} />
          </div>
        </form>
      )}
    </>
  );
};
