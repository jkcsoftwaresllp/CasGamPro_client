import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../common/table/jsx/Table.jsx";
import { SettingsIcon, EditIcon } from "../../../../assets/assets.jsx";
import { routesPathClient as path } from "../../../routing/helper/routesPathClient.js";
import { Button } from "../../../common/Button.jsx";
import { DialogBox } from "./jsx/DialogBox.jsx";
export const CommissionTable = ({ clients }) => {
  const navigate = useNavigate();
  const [currentLimits, setCurrentLimits] = useState(
    Object.fromEntries(
      clients.map(({ id, currentLimit }) => [id, currentLimit])
    )
  );
  const [showDialog, setShowDialog] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleLimitChange = (id, value) => {
    setCurrentLimits((prev) => ({ ...prev, [id]: value }));
  };

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
    showExpo: (
      <Button label="Show Expo" onClick={() => openDialog(client.id)} />
    ),
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
    { label: "Deposit", icon: EditIcon, onClick: (row) => {} },
    { label: "Withdrawal", icon: EditIcon, onClick: (row) => {} },
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

      {/* Dialog Box Component */}
      <DialogBox
        isOpen={showDialog}
        onClose={closeDialog}
        header="Client Exposure Details"
        clientId={selectedClientId}
      />
    </>
  );
};
