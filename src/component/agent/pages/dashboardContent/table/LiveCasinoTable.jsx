import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
import { useOutletContext } from "react-router-dom";
import { TableOverWindow } from "../TableOverWindow.jsx";
import { apiCall } from "../../../../common/apiCall.js";

export const LiveCasinoTable = ({}) => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;
  const [dataDetailView, setDataDetailView] = useState([]);
  const [isOverlayView, setIsOverlayView] = useState(false);

  const tableData = data.map((games) => ({
    title: games.title,
    date: games.date,
    profitLoss: games.profitLoss,
  }));

  const columnsMain = [
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "profitLoss", label: "Profit Loss" },
  ];

  const columnWidthsMain = { title: 2 };

  const columnsOverlay = [
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "betAmount", label: "Bet Amount" },
    { key: "agentPL", label: "Agent P/L" },
    { key: "companyPL", label: "Company P/L" },
  ];

  const columnWidthsOverlay = { description: 2 };

  const handleCellClick = async (value, row) => {
    const apiUrl = `/auth-api/panel/games/livecasino/${row.title}/${row.date}`;

    const response = await apiCall(apiUrl, "GET");
    console.log("API Response:", response);

    if (response.uniqueCode === "CGP0289") {
      setDataDetailView(response.data.results);
    } else {
      console.error("API Error:", response.data);
    }

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
            <TableOverWindow
              data={dataDetailView}
              columns={columnsOverlay}
              columnWidths={columnWidthsOverlay}
              isAction={false}
              setIsOverlayView={setIsOverlayView}
            />
          ) : (
            <div className={style.tableContent}>
              <Table
                data={tableData}
                columns={columnsMain}
                columnWidths={columnWidthsMain}
                isAction={false}
                clickableColumns={["title"]}
                onCellClick={handleCellClick}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
