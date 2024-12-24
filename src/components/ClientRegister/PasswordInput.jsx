import style from "./styles/ClientRegister.module.css";

const PasswordInput = ({ label, name, value, onChange, placeholder }) => (
  <div className={style.input}>
    <label>{label}</label>
    <input
      type="password"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%", padding: "8px" }}
    />
  </div>
);

export default PasswordInput;
