import { LedgerHeader } from "./LedgerHeader.jsx";
import { LedgerList } from "./LedgerList";
import style from "../style/LedgerMain.module.css";

export const LedgerMain = () => {
  return (
    <div className={style.ledgerMain}>
      <LedgerHeader />
      <LedgerList />
    </div>
  );
};
