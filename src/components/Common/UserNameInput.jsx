import { useState } from "react";
import style from "./style/Input.module.css";

const UsernameInput = ({ placeholder = "Username", onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Allow only alphanumeric characters
    if (/^[a-zA-Z0-9]*$/.test(inputValue)) {
      setValue(inputValue);
      if (onChange) onChange(inputValue); // Notify parent if onChange is provided
    }
  };

  return (
    <input
      type="text"
      className={style.input}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default UsernameInput;
