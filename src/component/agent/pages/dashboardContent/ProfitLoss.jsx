import React, { useState } from "react";
import style from "../styles/ManageClient.module.css";
import { ProfitLossTable } from "./table/ProfitLossTable";

export const ProfitLoss = () => {
  const [data] = useState([
    {
      date: "11-12-2024",
      rountId: "256554",
      roundTitle: "Lucky 7B",
      roundEarning: 4200,
      commissionEarning: 200,
      totlaEarning: 5000,
    },
    {
      date: "11-12-2024",
      rountId: "256554",
      roundTitle: "Lucky 7B",
      roundEarning: 4200,
      commissionEarning: 200,
      totlaEarning: 5000,
    },
    {
      date: "11-12-2024",
      rountId: "256554",
      roundTitle: "Lucky 7B",
      roundEarning: 4200,
      commissionEarning: 200,
      totlaEarning: 5000,
    },
    {
      date: "11-12-2024",
      rountId: "256554",
      roundTitle: "Lucky 7B",
      roundEarning: 4200,
      commissionEarning: 200,
      totlaEarning: 5000,
    },
    {
      date: "11-12-2024",
      rountId: "256554",
      roundTitle: "Lucky 7B",
      roundEarning: 4200,
      commissionEarning: 200,
      totlaEarning: 5000,
    },
    {
      date: "11-12-2024",
      rountId: "256554",
      roundTitle: "Lucky 7B",
      roundEarning: 4200,
      commissionEarning: 200,
      totlaEarning: 5000,
    },
  ]);

  return (
    <div className={style.manageClientsContainer}>
      {/* Row for Search Bar and Buttons */}
      <div className={style.actionRow}>
        <h1 className={style.header}>Profit Loss </h1>
      </div>

      {/* Client Table */}
      <div className={style.tableContainer}>
        <ProfitLossTable data={data} />
      </div>
    </div>
  );
};
