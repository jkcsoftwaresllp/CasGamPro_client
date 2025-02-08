import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { EditIcon } from "../../../../../assets/assets.jsx";
import { GameTableWindow } from "../GameTableWindow.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import style from "../../styles/ManageClient.module.css";
import { games } from "../helper/games.js";

export const BlockMarketTable = () => {
  const { loading, data } = games(); // Fixed "Loading" to "loading" for consistency
  const [isGameView, setIsGameView] = useState(false);
  const [gameName, setGameName] = useState(""); // Changed initial state to an empty string

  const tableData = data.map((game) => ({
    // Fixed "games" to "game" for clarity
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
      onClick: (row) => console.log(`Edit client ${row.id}`),
    },
  ];

  const handleCellClick = (value) => {
    setGameName(value);
    setIsGameView(true);
  };

  return (
    <>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.manageCommissionsContainer}>
          {isGameView && (
            <GameTableWindow
              setIsGameView={setIsGameView}
              gameName={gameName}
            />
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
        </div>
      )}
    </>
  );
};
