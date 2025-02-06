import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";

export const LiveCasinoTable = ({ games }) => {
  const tableData = games.map((games) => ({
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
    <Table
      data={tableData}
      columns={columns}
      columnWidths={columnWidths}
      isAction={false}
      clickableColumns={["title"]}
      onCellClick={handleCellClick}
    />
  );
};
