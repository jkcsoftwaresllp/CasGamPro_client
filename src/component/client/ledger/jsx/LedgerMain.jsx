// import { LedgerHeader } from "./LedgerHeader.jsx";
// import { LedgerList } from "./LedgerList";
// import style from "../style/LedgerMain.module.css";
import react, { useState } from "react";
import { Table } from "../../../common/table/jsx/Table.jsx";
import { getLedgerData } from "../helper/getPlayData.js";

export const LedgerMain = () => {
  const [lists, setLists] = useState([
    {
      date: "20-12-2023",
      entry: "Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry: "Added to the database. Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry:
        "Added to the database. Added to the database Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry: "Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry: "Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry: "Added to the database. Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry:
        "Added to the database. Added to the database Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry: "Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry: "Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry: "Added to the database. Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry:
        "Added to the database. Added to the database Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
    {
      date: "20-12-2023",
      entry: "Added to the database",
      debit: "200",
      credit: 500,
      balance: "530",
    },
  ]);

  getLedgerData();
  const columns = [
    { key: "date", label: "Date" },
    { key: "entry", label: "Entry" },
    { key: "debit", label: "Debit" },
    { key: "credit", label: "Credit" },
    { key: "balance", label: "Balance" },
  ];

  const columnWidths = {
    entry: 2,
  };

  return <Table data={lists} columns={columns} columnWidths={columnWidths} />;
};
