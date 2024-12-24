import style from "./styles/ClientRegister.module.css";

const NumberInput = ({ label, name, value, onChange, placeholder, note }) => (
  <div className={style.input}>
    <label>{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {note && <small>{note}</small>}
  </div>
);

export default NumberInput;
