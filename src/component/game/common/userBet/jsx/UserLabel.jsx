import style from "../style/UserLabel.module.css";

export const UserLabel = ({ label }) => {
  return <p className={style.label}>{label}</p>;
};

