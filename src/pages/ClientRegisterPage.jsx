import { useState } from "react";
import UserIdInput from "../components/ClientRegister/UserId";
import TextInput from "../components/ClientRegister/TextInput";
import NumberInput from "../components/ClientRegister/NumberInput";
import PasswordInput from "../components/ClientRegister/PasswordInput";
import Button from "../components/ClientRegister/Button";
import style from "../components/ClientRegister/styles/ClientRegister.module.css";

const ClientRegisterPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    fixLimit: "",
    myMatchShare: "",
    userMatchCommission: "0",
    userSessionCommission: "0",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2>New User</h2>
      <UserIdInput value={formData.userId} />
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
        note="Fix Limit can be set from 0 to 18.00"
      />
      <NumberInput
        label="My Match Share"
        name="myMatchShare"
        value={formData.myMatchShare}
        onChange={handleChange}
        placeholder="Enter My Match Share"
        note="My Match Share can be set from 0 to 15.0"
      />
      <NumberInput
        label="User Match Commission"
        name="userMatchCommission"
        value={formData.userMatchCommission}
        onChange={handleChange}
        placeholder="Enter User Match Commission"
        note="Match Commission can be set from 0 to 3"
      />
      <NumberInput
        label="User Session Commission"
        name="userSessionCommission"
        value={formData.userSessionCommission}
        onChange={handleChange}
        placeholder="Enter User Session Commission"
        note="Session Commission can be set from 0 to 3"
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
      <div>
        <Button label="Cancel" />
        <Button label="Save Changes" type="submit" />
      </div>
    </form>
  );
};

export default ClientRegisterPage;
