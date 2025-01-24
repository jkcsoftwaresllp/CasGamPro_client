import style from "../style/Ledger.module.css";
export const HeaderCell = ({ label }) => {
  return <p className={style.headerCell}>{label}</p>;
};
