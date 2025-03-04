import react from "react";
import { Table } from "../../../common/table/jsx/Table.jsx";
import style from "../../../agent/pages/dashboardContent/table/Table.module.css";
import { useOutletContext } from "react-router-dom";
import { Loader } from "../../../common/Loader.jsx";

export const PlayHistory = () => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;


  const columns = [
    { key: "gameName", label: "Game Name" },
    { key: "roundId", label: "Round ID" },
    { key: "stakeAmount", label: "Stake Amount" },
    { key: "result", label: "Result" },
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
