import { useState } from "react";
import style from "./style/Input.module.css";

export const TextInput = ({ placeholder, onChange, readOnly = false }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    if (!readOnly) {
      const inputValue = e.target.value;
      setValue(inputValue);
      if (onChange) {
        onChange(inputValue);
      }
    }
  };

  return (
    <input
      type="text"
      className={style.input}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      readOnly={readOnly} // Makes input readonly if true
    />
  );
};
