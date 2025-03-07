import React from "react";
import { Table } from "../../../common/table/jsx/Table.jsx";
import style from "../../../agent/pages/dashboardContent/table/Table.module.css";
import { Loader } from "../../../common/Loader.jsx";
import { useOutletContext } from "react-router-dom";

export const LedgerMain = () => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;


  const columns = [
    { key: "date", label: "Date" },
    { key: "entry", label: "Entry" },
    { key: "credit", label: "Credit (Win) " },
    { key: "debit", label: "Debit (Loss)" },
    { key: "balance", label: "Balance" },
  ];

  const columnWidths = {
    entry: 2,
  };

  return (
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.tableContent}>
          <Table data={data} columns={columns} columnWidths={columnWidths} />
        </div>
      )}
    </div>
  );
};
