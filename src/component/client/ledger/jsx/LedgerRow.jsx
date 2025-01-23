import React from "react";
import { LedgerCell } from "./LedgerCell";
import style from "../style/Ledger.module.css";

export const LedgerRow = ({ date, entry, debit, credit, balance }) => {
  return (
    <div className={style.list}>
      <LedgerCell label={date} />
      <LedgerCell label={entry} />
      <LedgerCell label={debit} />
      <LedgerCell label={credit} />
      <LedgerCell label={balance} />
    </div>
  );
};
