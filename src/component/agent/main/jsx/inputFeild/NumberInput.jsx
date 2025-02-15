import style from "../../styles/AgentNewUser.module.css";

export const NumberInput = ({
  label,
  name,
  value = "",
  onChange,
  placeholder,
  disable = false,
}) => (
  <>
    <div className={style.input}>
      <label>{label}</label>

      <input
        className={`${style.field} ${disable ? style.disable : ""}`}
        type="number"
        name={name}
        value={value === "" ? "" : value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disable}
      />
    </div>
  </>
);
