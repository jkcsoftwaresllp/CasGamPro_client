import { Cell } from "./Cell";
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
      <Cell label={date} />
      <Cell label={entry} />
      <Cell label={debit} />
      <Cell label={credit} />
      <Cell label={balance} />
    </div>
  );
};
