import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table } from "../../../common/table/jsx/Table.jsx";
import { SettingsIcon } from "../../../../assets/assets.jsx";
import { routesPathClient as path } from "../../../routing/helper/routesPathClient.js";
import { CustomBtn } from "../../../common/CustomBtn.jsx";
import { DialogBox } from "./jsx/DialogBox.jsx";
import { handleTransaction } from "./helper/transactionHelper.js";
import { Loader } from "../../../common/Loader.jsx";
import { manageCommissionData } from "./helper/commision.js";
import style from "./table/Table.module.css";
import { DownloadButtons } from "./jsx/DownloadBtn.jsx";
import { Button } from "../../../common/Button.jsx";

export const CommissionTable = () => {
  const { loading, data } = manageCommissionData();
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const [showDialog, setShowDialog] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const openDialog = (clientId) => {
    setSelectedClientId(clientId);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedClientId(null);
  };

  const filteredData = data.filter((client) =>
    client.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const tableData = currentData.map((client) => ({
    id: client.id,
    name: client.username,
    matchCommission: client.matchCommission,
    sessionCommission: client.sessionCommission,
    currentLimit: client.currentLimit,
    showExpo: <CustomBtn label="Expo" onClick={() => openDialog(client.id)} />,
  }));

  const columns = [
    { key: "id", label: "Client" },
    { key: "name", label: "Name" },
    { key: "matchCommission", label: "Match Comm." },
    { key: "sessionCommission", label: "Ssn Comm." },
    { key: "currentLimit", label: "Current Limit" },
    { key: "showExpo", label: "Show Expo" },
    { key: "actions", label: "Action" },
  ];

  const columnWidths = { name: 2, actions: 3 };

  const actionButtons = [
    {
      label: "Deposit",
      icon: "D",
      onClick: (row) => handleTransaction("Deposit", row),
    },
    {
      label: "Withdrawal",
      icon: "W",
      onClick: (row) => handleTransaction("Withdrawal", row),
    },
    { label: "Settings", icon: SettingsIcon, onClick: (row) => {} },
  ];

  const handleCellClick = (value, row) => {
    navigate(
      `${path.agent}${path.manageClients}${path.userInfo.replace(
        ":id",
        row.id
      )}`
    );
  };

  return (
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.tableContent}>
          <Table
            data={tableData}
            columns={columns}
            columnWidths={columnWidths}
            isAction={true}
            btns={actionButtons}
            clickableColumns={["name"]}
            onCellClick={handleCellClick}
          />
          <DialogBox
            isOpen={showDialog}
            onClose={closeDialog}
            header="Client Exposure Details"
            clientId={selectedClientId}
          />
        </div>
      )}
    </div>
  );
};
