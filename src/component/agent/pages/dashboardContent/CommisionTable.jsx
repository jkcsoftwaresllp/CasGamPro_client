import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table } from "../../../common/table/jsx/Table.jsx";
import {
  depositIcon,
  SettingsIcon,
  withdrawalIcon,
} from "../../../../assets/assets.jsx";
import { routesPathClient as path } from "../../../routing/helper/routesPathClient.js";
import { CustomBtn } from "../../../common/CustomBtn.jsx";
import { DialogBox } from "./jsx/DialogBox.jsx";
import { Loader } from "../../../common/Loader.jsx";
import style from "./table/Table.module.css";
import { handleTransaction } from "./helper/transactionHelper.js";

export const CommissionTable = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const navigate = useNavigate();

  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

  const basePath = `${path.agent}${path.manageClients}`;

  const openDialog = (clientId) => {
    setSelectedClientId(clientId);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedClientId(null);
  };

  const tableData = data.map((client) => ({
    id: client.id,
    name: `${client.firstName} ${client.lastName} (${client.username})`,
    share: client.share,
    casinoCommission: client.casinoCommission,
    lotteryCommission: client.lotteryCommission,
    currentLimit: client.currentLimit,
    showExpo: <CustomBtn label="Expo" onClick={() => openDialog(client.id)} />,
  }));

  const columns = [
    { key: "id", label: "Client" },
    { key: "name", label: "Name" },
    { key: "casinoCommission", label: "Casino Comm." },
    { key: "lotteryCommission", label: "Lottery Comm." },
    { key: "currentLimit", label: "Current Limit" },
    { key: "showExpo", label: "Show Expo" },
    { key: "actions", label: "Action" },
  ];

  const columnWidths = { name: 2, actions: 1.5 };

  const actionButtons = [
    {
      label: "Deposit",
      icon: depositIcon,
      onClick: (row) => handleTransaction("Deposit", row),
    },
    {
      label: "Withdrawal",
      icon: withdrawalIcon,
      onClick: (row) => handleTransaction("Withdrawal", row),
    },
    { label: "Settings", icon: SettingsIcon, onClick: (row) => {} },
  ];

  const handleCellClick = (value, row) => {
    navigate(`${basePath}${path.userInfo.replace(":id", row.id)}`);
  };

  return (
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.tableContent}>
          {showDialog ? (
            <DialogBox
              isOpen={showDialog}
              onClose={closeDialog}
              header="Client Exposure Details"
              clientId={selectedClientId}
            />
          ) : (
            <Table
              data={tableData}
              columns={columns}
              columnWidths={columnWidths}
              isAction={true}
              btns={actionButtons}
              clickableColumns={["name"]}
              onCellClick={handleCellClick}
            />
          )}
        </div>
      )}
    </div>
  );
};
