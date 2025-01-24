import { HeaderCell } from "./HeaderCell";
import style from "../style/Ledger.module.css";

export const LedgerHeader = ({
  date = "Date",
  entry = "Entry",
  debit = "Debit",
  credit = "Credit",
  balance = "Balance",
}) => {
  return (
    <div className={style.header}>
      <HeaderCell label={date} />
      <HeaderCell label={entry} />
      <HeaderCell label={debit} />
      <HeaderCell label={credit} />
      <HeaderCell label={balance} />
    </div>
  );
};
