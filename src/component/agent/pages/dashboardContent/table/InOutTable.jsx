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
    debit: entry.debit,
    credit: entry.credit,
    balance: entry.balance,
  }));

  const columns = [
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "debit", label: "Gya (Out)" },
    { key: "credit", label: "Aya (In)" },
    { key: "balance", label: "Balance" },
  ];

  const columnWidths = { description: 3 };

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
