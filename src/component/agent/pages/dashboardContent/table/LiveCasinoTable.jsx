import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import { manageLiveCasinoData } from "../helper/manageLiveCasinoData";
import style from "../../styles/ManageClient.module.css";

export const LiveCasinoTable = ({}) => {
  const { loading, data } = manageLiveCasinoData();
  const tableData = data.map((games) => ({
    title: games.title,
    date: games.date,
    declare: games.declare,
    profitLoss: games.profitLoss,
  }));

  const columns = [
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "declare", label: "Declare" },
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
    <div>
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
            isAction={false}
            clickableColumns={["title"]}
            onCellClick={handleCellClick}
          />
        </div>
      )}
    </div>
  );
};
