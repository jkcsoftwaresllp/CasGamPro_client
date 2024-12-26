import style from "../styles/ClientRegister.module.css";

const NumberInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  note,
  min,
  max,
}) => (
  <div className={style.input}>
    <label>{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
    />
    {note && <small>{note.replace("{min}", min).replace("{max}", max)}</small>}
  </div>
);

export default NumberInput;
