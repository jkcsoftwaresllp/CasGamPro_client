import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../../../../../context/jsx/AuthContext.jsx";
import { roles } from "../../../../../utils/roles.js";

export const LedgerTable = () => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

  const { user } = useAuth();
  let role;
  if (user) role = user.userRole;

  // const columns = [
  //   { key: "date", label: "Date" },
  //   { key: "entry", label: "Entry" },
  //   { key: "betsAmount", label: "Bets Amount" },
  //   { key: "profitAmount", label: "Profit Amount" },
  //   { key: "lossAmount", label: "Loss Amount" },
  //   { key: "agentProfit", label: "Profit (Agent)" },
  //   { key: "agentLoss", label: "Loss (Agent)" },
  //   { key: "superAgentProfit", label: "Profit (Super Agent)" },
  //   { key: "superAgentLoss", label: "Loss (Super Agent)" },
  //   { key: "agentCommission", label: "Agent Commission" },
  //   { key: "balance", label: "Balance" },
  // ];

  // const columns = [
  //   { key: "date", label: "Date" },
  //   { key: "entry", label: "Entry" },
  //   { key: "betsAmount", label: "Bets Amount" },
  //   { key: "clientPL", label: "Client P/L" },
  //   { key: "agentShare", label: "Agent Share" },
  //   { key: "superComm", label: "Agent Commission" },
  //   { key: "agentPL", label: "Agent P/L" },
  //   { key: "supeerAgentPL", label: "Super Agent P/L" },
  //   { key: "balance", label: "Balance" },
  // ];

  const additional =
    role === roles.ADMIN
      ? [
          { key: "agentPL", label: "Agent P/L" },
          { key: "superAgentPL", label: "Super Agent P/L" },
          { key: "adminPL", label: "Admin P/L" },
        ]
      : role === roles.SUPERAGENT
      ? [
          { key: "agentPL", label: "Agent P/L" },
          { key: "superAgentPL", label: "Super Agent P/L" },
        ]
      : role === roles.AGENT
      ? [{ key: "agentPL", label: "Agent P/L" }]
      : [];

  const columns = [
    { key: "date", label: "Date" },
    { key: "entry", label: "Entry" },
    { key: "betsAmount", label: "Bets Amount" },
    { key: "clientPL", label: "Client P/L" },
    ...additional,
    { key: "pass", label: "Passing Amount" },
  ];

  const columnWidths = { entry: 2, date: 2 };

  return (
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.tableContent}>
          <Table
            data={data}
            columns={columns}
            columnWidths={columnWidths}
            isAction={false} // Indicating no action buttons are shown
          />
        </div>
      )}
    </div>
  );
};
