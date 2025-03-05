import React, { useState } from "react";
import style from "./style/Input.module.css";
import { hideIcon, showIcon } from "../../assets/assets";
import { SetIcon } from "./jsx/SetIcon";

export const PasswordInput = ({ placeholder = "Password", onChange, name }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setPasswordVisible((prev) => !prev);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    name && onChange({ name: name, value: inputValue });
    !name && onChange && onChange(inputValue);
  };

  return (
    <div className={style.inputWrapper}>
      <input
        type={passwordVisible ? "text" : "password"}
        className={style.input}
        placeholder={placeholder}
        value={password}
        onChange={handleChange}
        aria-label={placeholder}
      />
      <div className={style.visibilityIcon} onClick={toggleVisibility}>
        <SetIcon icon={!passwordVisible ? hideIcon : showIcon} />
      </div>
    </div>
  );
};
