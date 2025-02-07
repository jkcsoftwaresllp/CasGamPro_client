// ManageClients.jsx
import React, { useState } from "react";
import { BlockMarketTable } from "./table/BlockMarketTable";

import style from "../styles/ManageClient.module.css"; // Import styles
import { useNavigate } from "react-router-dom";

export const BlockMarket = () => {
  const navigate = useNavigate();
  const [games] = useState([
    {
      id: 1,
      betfairid: "1.23",
      name: "Cricket",
      status: "Active",
    },
    {
      id: 2,
      betfairid: "1.24",
      name: "Football",
      status: "Active",
    },
    {
      id: 3,
      betfairid: "1.25",
      name: "Tennis",
      status: "Active",
    },
  ]);

  return (
    <div className={style.manageClientsContainer}>
      {/* Row for Search Bar and Buttons */}
      <div className={style.actionRow}>
        <h1 className={style.header}>Block Market</h1>
      </div>

      {/* Client Table */}
      <div className={style.tableContainer}>
        <BlockMarketTable games={games} />
      </div>
    </div>
  );
};
