import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { EditIcon } from "../../../../../assets/assets.jsx";
import { GameTableWindow } from "../GameTableWindow.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
// import style from "../../styles//Common.module.css";
import { Button } from "../../../../common/Button.jsx";
import { games } from "../helper/games.js";

export const BlockMarketTable = () => {
  const { loading, data } = games();
  const [isGameView, setIsGameView] = useState(false);
  const [gameName, setGameName] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  // Pagination Calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const tableData = currentData.map((game) => ({
    id: game.id,
    betfairid: game.betfairid,
    name: game.name,
    status: game.status,
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
      onClick: (row) => console.log(`Edit client ${row.id}`), // TODO : Blocking & Unblocking at Server end
    },
  ];

  const handleCellClick = (value) => {
    setGameName(value);
    setIsGameView(true);
  };

  return (
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
          {isGameView && (
            <GameTableWindow
              setIsGameView={setIsGameView}
              gameName={gameName}
            />
          )}
          <div className={style.tableContent}>
            <Table
              data={tableData}
              columns={columns}
              columnWidths={columnWidths}
              isAction={true} // Indicating that action buttons should be shown
              btns={actionButtons} // Passing action buttons here
              clickableColumns={["name"]}
              onCellClick={handleCellClick}
            />
          </div>
        </>
      )}
    </div>
  );
};
