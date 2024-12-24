import style from "./styles/ClientRegister.module.css";

const UserIdInput = ({ value }) => (
  <div className={style.input}>
    <label>User ID</label>
    <input
      type="text"
      value={value}
      disabled
      style={{ width: "100%", padding: "8px" }}
    />
  </div>
);

export default UserIdInput;
