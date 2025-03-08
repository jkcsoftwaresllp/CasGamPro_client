import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
import { useOutletContext } from "react-router-dom";
import { apiCall } from "../../../../common/apiCall.js";
import { TableOverWindow } from "../TableOverWindow.jsx";

export const LiveCasinoTable = ({}) => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;
  const [dataDetailView, setDataDetailView] = useState([]);
  const [isOverlayView, setIsOverlayView] = useState(false);

  const data1 = [
    {
      title: "Live Casino",
      date: "2021-09-01",
      profitLoss: 100,
    },
    {
      title: "Live Casino",
      date: "2021-09-02",
      profitLoss: 200,
    },
    {
      title: "Live Casino",
      date: "2021-09-03",
      profitLoss: 300,
    },
    {
      title: "Live Casino",
      date: "2021-09-04",
      profitLoss: 400,
    },
    {
      title: "Live Casino",
      date: "2021-09-05",
      profitLoss: 500,
    },
  ];

  const tableData = data1.map((games) => ({
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
    const apiUrl = `/auth-api/agent/games/livecasino/${row.title}/${row.date}`;

    // const response = await apiCall(apiUrl, "GET");
    // console.log("API Response:", response);

    // if(response.uniqueCode === "CGP0080") {
    //   setDataDetailView(response.data);
    // } else {
    //   console.error("API Error:", response.data);
    // }

    setDataDetailView([
      {
        date: "2021-09-01",
        description: "Teen Patti",
        betAmount: 1000,
        agentPL: 100,
        companyPL: 200,
      },
      {
        date: "2021-09-02",
        description: "Andar Bahar",
        betAmount: 2000,
        agentPL: 200,
        companyPL: 300,
      },
      {
        date: "2021-09-03",
        description: "Lucky 7 B",
        betAmount: 3000,
        agentPL: 300,
        companyPL: 400,
      },
      {
        date: "2021-09-04",
        description: "DTL",
        betAmount: 4000,
        agentPL: 400,
        companyPL: 500,
      },
      {
        date: "2021-09-05",
        description: "Dragon Tiger",
        betAmount: 5000,
        agentPL: 500,
        companyPL: 600,
      },
    ]);

    setIsOverlayView(true);

    console.log("Cell clicked", value, row);
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
