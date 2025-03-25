import style from "../../styles/AgentNewUser.module.css";

export const NumberInput = ({
  label,
  name,
  value = "",
  onChange = () => {},
  placeholder,
  disable = false,
  maxLimit = "MAX",
}) => {
  const modifedDisable =
    maxLimit === "MAX" ? disable : String(maxLimit) === "0" || disable;

  return (
    <>
      <div className={style.input}>
        <label>{label}</label>

        <input
          className={`${style.field} ${modifedDisable ? style.disable : ""}`}
          type="number"
          name={name}
          value={value === "" ? "" : value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={modifedDisable}
        />
        {maxLimit !== "MAX" && <p className={style.maxLimit}>{maxLimit}%</p>}
      </div>
    </>
  );
};
