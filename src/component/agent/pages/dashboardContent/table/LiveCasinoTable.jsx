import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
import { useOutletContext } from "react-router-dom";

export const LiveCasinoTable = ({}) => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

  const tableData = data.map((games) => ({
    title: games.title,
    date: games.date,
    profitLoss: games.profitLoss,
  }));

  const columns = [
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "profitLoss", label: "Profit Loss" },
  ];

  const columnWidths = { title: 2 };

  const handleCellClick = (value, row) => {
    // navigate(
    //   `${path.agent}${path.manageClients}${path.userInfo.replace(
    //     ":id",
    //     row.id
    //   )}`
    // );

    console.log("Cell clicked", value, row);
  };

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
            clickableColumns={["title"]}
            onCellClick={handleCellClick}
          />
        </div>
      )}
    </div>
  );
};
