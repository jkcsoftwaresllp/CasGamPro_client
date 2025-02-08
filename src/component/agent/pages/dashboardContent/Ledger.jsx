import React, { useState } from "react";
import style from "../styles/ManageClient.module.css";
import { LedgerTable } from "./table/LedgerTable";

export const Ledger = () => {
  const [data] = useState([
    {
      agentId: "12345",
      entry: "Casino - Teen Patti 569", // Last 3 digits of roundId
      betsAmount: 50000,
      profitAmount: 10000,
      lossAmount: 5000,
      agentProfitShare: {
        credit: 10000,
        debit: 5000,
      },
      agentCommission: 2000,
      balance: 7000,
      note: "Settlement for round 1001",
    },
    {
      agentId: "12345",
      entry: "Casino - Teen Patti 569", // Last 3 digits of roundId
      betsAmount: 50000,
      profitAmount: 10000,
      lossAmount: 5000,
      agentProfitShare: {
        credit: 10000,
        debit: 5000,
      },
      agentCommission: 2000,
      balance: 7000,
      note: "Settlement for round 1001",
    },
    {
      agentId: "12345",
      entry: "Casino - Teen Patti 569", // Last 3 digits of roundId
      betsAmount: 50000,
      profitAmount: 10000,
      lossAmount: 5000,
      agentProfitShare: {
        credit: 10000,
        debit: 5000,
      },
      agentCommission: 2000,
      balance: 7000,
      note: "Settlement for round 1001",
    },
    {
      agentId: "12345",
      entry: "Casino - Teen Patti 569", // Last 3 digits of roundId
      betsAmount: 50000,
      profitAmount: 10000,
      lossAmount: 5000,
      agentProfitShare: {
        credit: 10000,
        debit: 5000,
      },
      agentCommission: 2000,
      balance: 7000,
      note: "Settlement for round 1001",
    },
  ]);

  return (
    <div className={style.manageClientsContainer}>
      {/* Client Table */}
      <div className={style.tableContainer}>
        <LedgerTable data={data} />
      </div>
    </div>
  );
};
