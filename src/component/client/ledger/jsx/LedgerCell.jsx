import style from "../style/Ledger.module.css";
export const LedgerCell = ({ label }) => {
  return <p className={style.label}>{label}</p>;
};
