import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { EditIcon } from "../../../../../assets/assets.jsx";
import { GameTableWindow } from "../GameTableWindow.jsx";

export const BlockMarketTable = ({ games }) => {
  const [isGameView, setIsGameView] = useState(false);
  const [gameName, setGameName] = useState(false);

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
    setGameName(value);
    setIsGameView(true);
  };

  return (
    <>
      {isGameView && (
        <GameTableWindow setIsGameView={setIsGameView} gameName={gameName} />
      )}
      <Table
        data={tableData}
        columns={columns}
        columnWidths={columnWidths}
        isAction={true} // Indicating that action buttons should be shown
        btns={actionButtons} // Passing action buttons here
        clickableColumns={["name"]}
        onCellClick={handleCellClick}
      />
    </>
  );
};
