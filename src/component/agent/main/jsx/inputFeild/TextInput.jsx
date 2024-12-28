import style from "../../styles/AgentNewUser.module.css";

const TextInput = ({ label, name, value, onChange, placeholder }) => (
  <div className={style.input}>
    <label className={style.label}>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={style.inputField}
    />
  </div>
);

export default TextInput;
