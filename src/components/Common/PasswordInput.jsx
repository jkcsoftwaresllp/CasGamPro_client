import React, { useState } from "react";
import style from "./style/Input.module.css";
import Show from "../../../public/icons/show.svg";
import Hide from "../../../public/icons/hide.svg";

const PasswordInput = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={style.inputWrapper}>
      <input
        type={passwordVisible ? "text" : "password"}
        className={style.input}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className={style.visibilityIcon}
      >
        <img src={passwordVisible ? Show : Hide} alt="visibility icon" />
      </button>
    </div>
  );
};

export default PasswordInput;
