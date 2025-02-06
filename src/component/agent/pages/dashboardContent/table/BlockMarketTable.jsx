import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { EditIcon, SettingsIcon } from "../../../../../assets/assets.jsx";
export const BlockMarketTable = ({ games }) => {
  const tableData = games.map((games) => ({
    id: games.id,
    betfairid: games.betfairid,
    name: games.name,
    status: games.status,
  }));

  const columns = [
    { key: "id", label: "So." },
    { key: "betfairid", label: "BetfairId" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Unblock" },
  ];

  const columnWidths = { name: 2 };

  const actionButtons = [
    {
      label: "Edit",
      icon: EditIcon,
      onClick: (row) => console.log(`Edit client ${row.id}`),
    },
  ];

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
      isAction={true} // Indicating that action buttons should be shown
      btns={actionButtons} // Passing action buttons here
      clickableColumns={["name"]}
      onCellClick={handleCellClick}
    />
  );
};
