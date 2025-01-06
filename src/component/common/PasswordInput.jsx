import React, { useState } from "react";
import style from "./style/Input.module.css";
import Show from "./images/show.svg";
import Hide from "./images/hide.svg";

export const PasswordInput = ({ placeholder = "Password", onChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const toggleVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    if (onChange) onChange(inputValue); // Notify parent if `onChange` is provided
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
      <button
        type="button"
        onClick={toggleVisibility}
        className={style.visibilityIcon}
        aria-label={passwordVisible ? "Hide password" : "Show password"}
      >
        <img
          src={passwordVisible ? Hide : Show}
          alt={passwordVisible ? "Hide password" : "Show password"}
        />
      </button>
    </div>
  );
};
