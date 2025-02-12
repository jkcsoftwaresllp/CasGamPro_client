import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import style from "./Table.module.css";
import { Loader } from "../../../../common/Loader.jsx";
import { manageInOut } from "../helper/manageInOut.js";
import { Button } from "../../../../common/Button.jsx";

export const InOutTable = ({}) => {
  const { data, loading } = manageInOut();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const tableData = currentData.map((entry) => ({
    date: entry.date,
    description: entry.description,
    aya: entry.aya,
    gya: entry.gya,
    commPosative: entry.commPosative,
    commNegative: entry.commNegative,
    limit: entry.limit,
  }));

  const columns = [
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "aya", label: "Aya" },
    { key: "gya", label: "Gya" },
    { key: "commPosative", label: "Comm+" },
    { key: "commNegative", label: "Comm-" },
    { key: "limit", label: "Limit" },
  ];

  const columnWidths = { date: 0.5, description: 4 };

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
            isAction={false}
          />
        </div>
      )}
    </div>
  );
};
