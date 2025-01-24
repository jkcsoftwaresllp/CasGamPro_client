import React from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import style from "../style/Table.module.css";

export const Table = ({ data, columns, columnWidths = {} }) => {
  return (
    <div className={style.table}>
      <TableHeader columns={columns} columnWidths={columnWidths} />
      <TableBody data={data} columns={columns} columnWidths={columnWidths} />
    </div>
  );
};

/*

USE:


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
    }
  ]);

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

*/


