import style from "../style/UserLabel.module.css";

const UserLabel = ({ label }) => {
  return <p className={style.label}>{label}</p>;
};

export default UserLabel;
