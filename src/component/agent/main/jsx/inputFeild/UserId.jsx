import style from "../../styles/AgentNewUser.module.css";

export const UserIdInput = ({ value = "" }) => (
  <div className={style.input}>
    <label>User ID</label>
    <input
      type="text"
      value={value}
      disabled
      className={`${style.field} ${style.disable}`}
    />
  </div>
);
