import { useState } from "react";
import style from "./style/Input.module.css";

export const TextInput = ({ placeholder, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
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
