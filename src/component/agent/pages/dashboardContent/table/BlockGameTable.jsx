import React from "react";
import { EditIcon } from "../../../../../assets/assets.jsx";
import { TableOverWindow } from "../TableOverWindow.jsx";
import { handleBlockUnBlockGame } from "./BlockMarketTable.jsx";

export const BlockGameTable = ({ games, setIsOverlayView }) => {
  const tableData = games.map((games) => ({
    id: games.id,
    gameId: games.betfairid,
    name: games.name,
    status: games.status,
  }));

  const columns = [
    { key: "id", label: "So." },
    { key: "gameId", label: "Game ID" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Unblock" },
  ];

  const columnWidths = { name: 2 };

  const actionButtons = [
    {
      label: "Edit",
      icon: EditIcon,
      onClick: (row) => handleBlockUnBlockGame(row, "game"),
    },
  ];

  return (
    <TableOverWindow
      data={tableData}
      columns={columns}
      columnWidths={columnWidths}
      isAction={true} // Indicating that action buttons should be shown
      btns={actionButtons} // Passing action buttons here
      setIsOverlayView={setIsOverlayView}
    />
  );
};
