import style from "./styles/ClientRegister.module.css";

const TextInput = ({ label, name, value, onChange, placeholder }) => (
  <div className={style.input}>
    <label>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%", padding: "8px" }}
    />
  </div>
);

export default TextInput;
