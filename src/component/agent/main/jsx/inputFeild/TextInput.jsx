import style from "../../styles/AgentNewUser.module.css";

export const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disable = false,
}) => (
  <div className={style.input}>
    <label className={style.label}>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${style.inputField} ${style.field} ${
        disable ? style.disable : ""
      }`}
    />
  </div>
);
