import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import { manageProfitLossData } from "../helper/manageProfitLossData.js";
import style from "../../styles/Common.module.css";
import { Button } from "../../../../common/Button.jsx";

export const ProfitLossTable = () => {
  const { data, loading } = manageProfitLossData();

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
