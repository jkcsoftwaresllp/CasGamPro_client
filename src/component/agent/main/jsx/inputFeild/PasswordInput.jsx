import { PasswordInput as PasswordField } from "../../../../common/PasswordInput";
import style from "../../styles/AgentNewUser.module.css";

export const PasswordInput = ({ label, onChange, placeholder, name }) => (
  <div className={style.input}>
    <label>{label}</label>
    <PasswordField placeholder={placeholder} onChange={onChange} name={name} />
  </div>
);
