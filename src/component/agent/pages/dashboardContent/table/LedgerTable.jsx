import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
import { useOutletContext } from "react-router-dom";

export const LedgerTable = () => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

  const tableData = data.map((entry) => ({
    date: entry.date,
    entry: entry.entry, // Last 3 digits of roundId
    betsAmount: entry.betsAmount,
    profitAmount: entry.profitAmount,
    lossAmount: entry.lossAmount,
    agentProfit: entry.agentProfit,
    agentLoss: entry.agentLoss,
    agentCommission: entry.agentCommission,
    balance: entry.balance,
  }));

  const columns = [
    { key: "date", label: "Date" },
    { key: "entry", label: "Entry" },
    { key: "betsAmount", label: "Bets Amount" },
    { key: "profitAmount", label: "Profit Amount" },
    { key: "lossAmount", label: "Loss Amount" },
    { key: "agentProfit", label: "Profit (Agent)" },
    { key: "agentLoss", label: "Loss (Agent)" },
    { key: "agentCommission", label: "Agent Commission" },
    { key: "balance", label: "Balance" },
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
