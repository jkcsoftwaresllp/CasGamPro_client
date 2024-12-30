import style from "../../styles/AgentNewUser.module.css";

const PasswordInput = ({ label, name, value, onChange, placeholder }) => (
  <div className={style.input}>
    <label>{label}</label>
    <input
      type="password"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default PasswordInput;
