import style from "../../styles/AgentNewUser.module.css";

export const NumberInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  min,
  max,
}) => (
  <>
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
    </div>

    <div className={style.note}>
      Fix Limit can be set from {min} to {max}
    </div>
  </>
);
