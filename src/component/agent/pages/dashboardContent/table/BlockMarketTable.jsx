import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import {
  BlockIcon,
  EditIcon,
  UnBlockIcon,
} from "../../../../../assets/assets.jsx";
import { GameTableWindow } from "../GameTableWindow.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
// import style from "../../styles//Common.module.css";
import { games } from "../helper/games.js";
import { apiCall } from "../../../../common/apiCall.js";
import { getToastTypes, showToast } from "../../../../common/showToast.jsx";

export const handleBlockUnBlockGame = async (row, type) => {
  const response = await apiCall("/auth-api/agent/gameBlock", "POST", {
    id: row.id,
    type,
  });

  if (response.uniqueCode === "CGP0154") {
    showToast(getToastTypes.type1, response.message);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else if (response.uniqueCode === "CGP0109") {
    showToast(getToastTypes.type2, response.message);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
};

export const BlockMarketTable = () => {
  const { loading, data } = games();
  const [gameName, setGameName] = useState("");
  const [isOverlayView, setIsOverlayView] = useState(false);

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
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Unblock" },
  ];

  const columnWidths = { name: 2 };

  const actionButtons = [
    {
      label: "Edit",
      icon: EditIcon,
      onClick: (row) => handleBlockUnBlockGame(row, "category"), // TODO : Blocking & Unblocking at Server end
    },
  ];

  const handleCellClick = (value) => {
    setGameName(value);
    setIsOverlayView(true);
  };

  return (
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
          {isOverlayView ? (
            <GameTableWindow
              setIsOverlayView={setIsOverlayView}
              gameName={gameName}
            />
          ) : (
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
          )}
        </>
      )}
    </div>
  );
};
