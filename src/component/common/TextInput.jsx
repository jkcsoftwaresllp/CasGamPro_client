import { useState } from "react";
import style from "./style/Input.module.css";

export const TextInput = ({ placeholder, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue); // Update the state with the new input value
    if (onChange) {
      onChange(inputValue); // Call the onChange prop if provided
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
