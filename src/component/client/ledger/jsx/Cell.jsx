import style from "../style/Ledger.module.css";

export const Cell = ({ label }) => {
  return <p className={style.label}>{label}</p>;
};
