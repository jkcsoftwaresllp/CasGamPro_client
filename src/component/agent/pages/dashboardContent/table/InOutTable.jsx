import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import style from "./Table.module.css";
import { Loader } from "../../../../common/Loader.jsx";

import { useOutletContext } from "react-router-dom";

export const InOutTable = ({}) => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

  const tableData = data.map((entry) => ({
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
