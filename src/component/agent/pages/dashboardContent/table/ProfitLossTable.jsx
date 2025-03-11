import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import style from "../../styles/Common.module.css";
import { useOutletContext } from "react-router-dom";

export const ProfitLossTable = () => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

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
    { key: "roundEarning", label: "Win/Loss Amount" },
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
