import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";

export const LedgerTable = ({ data }) => {
  const tableData = data.map((entry) => ({
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
    <Table
      data={tableData}
      columns={columns}
      columnWidths={columnWidths}
      isAction={false} // Indicating that action buttons should be shown
    />
  );
};
