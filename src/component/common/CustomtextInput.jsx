import style from "./style/Input.module.css";

export const CustomTextInput = ({
  placeholder,
  value,
  onChange,
  readOnly = false,
}) => {
  return (
    <input
      type="text"
      className={style.input}
      placeholder={placeholder}
      value={value} // Use external value instead of internal state
      onChange={(e) => !readOnly && onChange(e.target.value)}
      readOnly={readOnly} // Makes input readonly if true
    />
  );
};
