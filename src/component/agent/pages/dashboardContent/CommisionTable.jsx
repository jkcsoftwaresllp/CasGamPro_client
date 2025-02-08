import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../common/table/jsx/Table.jsx";
import { SettingsIcon } from "../../../../assets/assets.jsx";
import { routesPathClient as path } from "../../../routing/helper/routesPathClient.js";
import { CustomBtn } from "../../../common/CustomBtn.jsx";
import { DialogBox } from "./jsx/DialogBox.jsx";
import { handleTransaction } from "./helper/transactionHelper.js"; // Import the helper

export const CommissionTable = ({ clients }) => {
  const navigate = useNavigate();
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

  const tableData = clients.map((client) => ({
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
    <>
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
    </>
  );
};
