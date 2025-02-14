// import { LedgerHeader } from "./LedgerHeader.jsx";
// import { LedgerList } from "./LedgerList";
// import style from "../style/LedgerMain.module.css";
import React, { useEffect, useState } from "react";
import { Table } from "../../../common/table/jsx/Table.jsx";
import { getLedgerData } from "../helper/getPlayData.js";
import style from "../../../agent/pages/dashboardContent/table/Table.module.css";
import { Loader } from "../../../common/Loader.jsx";
import { apiCall } from "../../../common/apiCall.js";

export const LedgerMain = () => {
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiCall("/auth-api/client/ledger", "GET");
      console.log("Ledger Data:", response);
      if (response && response.uniqueCode === "CGP0085") {
        setLedger(response.data);
        setLoading(false);
      } else console.error("API Error:", response);
    };

    fetchData();
  }, []);

  // const list = [];
  console.log("List", ledger);

  getLedgerData();
  const columns = [
    { key: "date", label: "Date" },
    { key: "entry", label: "Entry" },
    { key: "debit", label: "Debit" },
    { key: "credit", label: "Credit" },
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
          <Table data={ledger} columns={columns} columnWidths={columnWidths} />
        </div>
      )}
    </div>
  );
};
