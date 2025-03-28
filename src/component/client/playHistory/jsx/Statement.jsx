import react from "react";
import { Table } from "../../../common/table/jsx/Table.jsx";
import style from "../../../agent/pages/dashboardContent/table/Table.module.css";
import { useOutletContext } from "react-router-dom";
import { Loader } from "../../../common/Loader.jsx";

export const Statement = () => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

  const columns = [
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "debit", label: "Debit" },
    { key: "credit", label: "Credit" },
    { key: "balance", label: "Balance" },
  ];

  return (
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.tableContent}>
          <Table data={data} columns={columns} />
        </div>
      )}
    </div>
  );
};
