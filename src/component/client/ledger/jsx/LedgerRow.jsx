import React from "react";
import { Cell } from "./Cell";
import style from "../style/Ledger.module.css";

export const LedgerRow = ({ date, entry, debit, credit, balance }) => {
  return (
    <div className={style.list}>
      <Cell label={date} />
      <Cell label={entry} />
      <Cell label={debit} />
      <Cell label={credit} />
      <Cell label={balance} />
    </div>
  );
};
