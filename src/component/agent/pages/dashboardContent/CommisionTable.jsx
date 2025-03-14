import React, { useState, useCallback, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table } from "../../../common/table/jsx/Table.jsx";
import {
  depositIcon,
  profitLossIcon,
  statementIcon,
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
  const [selectedTable, setSelectedTable] = useState(null);
  const navigate = useNavigate();

  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

  const basePath = `${path.agent}${path.manageClients}`;

  // Memoized function to prevent unnecessary re-renders
  const openDialog = useCallback((clientId, table) => {
    setSelectedClientId(clientId);
    setSelectedTable(table);
    setShowDialog(true);
  }, []);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
    setSelectedClientId(null);
    setSelectedTable(null);
  }, []);

  // Memoize table data to prevent recalculations
  const tableData = useMemo(
    () =>
      data.map((client) => ({
        id: client.id,
        name: `${client.firstName} ${client.lastName} (${client.username})`,
        share: client.share,
        casinoCommission: client.casinoCommission,
        lotteryCommission: client.lotteryCommission,
        currentLimit: client.currentLimit,
        showExpo: (
          <CustomBtn
            label="Expo"
            onClick={() => openDialog(client.id, "Expo")}
          />
        ),
      })),
    [data, openDialog]
  );

  const columns = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "casinoCommission", label: "Casino Comm." },
      { key: "lotteryCommission", label: "Lottery Comm." },
      { key: "currentLimit", label: "Current Limit" },
      { key: "showExpo", label: "Show Expo" },
      { key: "actions", label: "Action" },
    ],
    []
  );

  const columnWidths = useMemo(() => ({ name: 2, actions: 1.5 }), []);

  const actionButtons = useMemo(
    () => [
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
      {
        label: "ProfitLoss",
        icon: profitLossIcon,
        onClick: (row) => openDialog(row.id, "ProfitLoss"),
      },
      {
        label: "Statement",
        icon: statementIcon,
        onClick: (row) => openDialog(row.id, "Statement"),
      },
    ],
    [openDialog]
  );

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
              tableName={selectedTable}
            />
          ) : (
            <Table
              data={tableData}
              columns={columns}
              columnWidths={columnWidths}
              isAction={true}
              btns={actionButtons}
              clickableColumns={["name"]}
              onCellClick={(value, row) =>
                navigate(`${basePath}${path.userInfo.replace(":id", row.id)}`)
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

// <DialogBox
//             isOpen={showDialog}
//             onClose={closeDialog}
//             header="Client Exposure Details"
//             clientId={selectedClientId}
//             tableName={selectedTable}
//           />
//           <Table
//             data={tableData}
//             columns={columns}
//             columnWidths={columnWidths}
//             isAction={true}
//             btns={actionButtons}
//             clickableColumns={["name"]}
//             onCellClick={(value, row) =>
//               navigate(`${basePath}${path.userInfo.replace(":id", row.id)}`)
//             }
//           />
