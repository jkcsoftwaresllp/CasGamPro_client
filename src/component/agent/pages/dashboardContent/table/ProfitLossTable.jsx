import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import { manageProfitLossData } from "../helper/manageProfitLossData.js";
import style from "../../styles/ManageClient.module.css";

export const ProfitLossTable = () => {
  const { data, loading } = manageProfitLossData();

  const tableData = data.map((entry) => ({
    date: entry.date,
    roundId: entry.roundId, // Fixed typo
    roundTitle: entry.roundTitle,
    roundEarning: entry.roundEarning,
    commissionEarning: entry.commissionEarning,
    totalEarning: entry.totalEarning, // Fixed typo
  }));

  const columns = [
    { key: "date", label: "Date" },
    { key: "roundId", label: "Round ID" },
    { key: "roundTitle", label: "Round Title" },
    { key: "roundEarning", label: "Round Earning" },
    { key: "commissionEarning", label: "Commission Earning" },
    { key: "totalEarning", label: "Total Earning" },
  ];

  const columnWidths = { date: 0.5, roundTitle: 2 };

  const handleCellClick = (value, row) => {
    console.log("Cell clicked", value, row);
  };

  return (
    <>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.manageCommissionsContainer}>
          <Table
            data={tableData}
            columns={columns}
            columnWidths={columnWidths}
            isAction={false} // No action buttons required
            clickableColumns={["roundId"]}
            onCellClick={handleCellClick}
          />
        </div>
      )}
    </>
  );
};
