import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { manageLenDen } from "../helper/manageLenDen.js";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
import { Button } from "../../../../common/Button.jsx";

export const LedgerTable = () => {
  const { data, loading } = manageLenDen();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Pagination Calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const tableData = currentData.map((entry) => ({
    agentId: entry.agentId,
    entry: entry.entry, // Last 3 digits of roundId
    betsAmount: entry.betsAmount,
    profitAmount: entry.profitAmount,
    lossAmount: entry.lossAmount,
    credit: entry.agentProfitShare.credit,
    debit: entry.agentProfitShare.debit,
    agentCommission: entry.agentCommission,
    balance: entry.balance,
    note: entry.note,
  }));

  const columns = [
    { key: "agentId", label: "Agent Id" },
    { key: "entry", label: "Entry" },
    { key: "betsAmount", label: "Bets Amount" },
    { key: "profitAmount", label: "Profit Amount" },
    { key: "lossAmount", label: "Loss Amount" },
    { key: "credit", label: "Credit" },
    { key: "debit", label: "Debit" },
    { key: "agentCommission", label: "Agent Commission" },
    { key: "balance", label: "Balance" },
    { key: "note", label: "Note" },
  ];

  const columnWidths = { entry: 2, note: 2 };

  return (
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.tableContent}>
          <Table
            data={tableData}
            columns={columns}
            columnWidths={columnWidths}
            isAction={false} // Indicating no action buttons are shown
          />
        </div>
      )}
    </div>
  );
};
