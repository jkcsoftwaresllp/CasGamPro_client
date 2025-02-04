import React, { useState } from "react";
import { Table } from "../../common/table/jsx/Table";

export const Test = () => {
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

  const handleCellClick = (value, row) => {
    console.log("Clicked Cell Value:", value);
    console.log("Clicked Row Data:", row);
  };

  return (
    <Table
      data={lists}
      columns={columns}
      columnWidths={columnWidths}
      clickableColumns={["entry"]} // Make "entry" column clickable
      onCellClick={handleCellClick}
    />
  );
};
