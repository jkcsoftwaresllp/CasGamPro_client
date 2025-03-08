import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { UnBlockIcon } from "../../../../../assets/assets.jsx";
import { showUnblockUserSwal } from "../helper/swalHelpers.js";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
import { useOutletContext } from "react-router-dom";

export const BlockTable = () => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

  // Convert data for the table
  const tableData = data.map((client) => ({
    username: client.username,
    matchCommission: client.matchCommission,
    sessionCommission: client.sessionCommission,
    share: client.share,
  }));

  const columns = [
    { key: "username", label: "UserName" },
    { key: "matchCommission", label: "Match Commission" },
    { key: "sessionCommission", label: "Session Commission" },
    { key: "share", label: "Share" },
    { key: "actions", label: "Actions" },
  ];

  const columnWidths = { username: 2, actions: 2 };

  const handleEditClick = async (row) => {
    const { isConfirmed, value } = await showUnblockUserSwal(row.username);

    if (isConfirmed) {
      console.log(`User input: ${value}`);
      console.log(`User ${row.id} (${row.username}) unblocked!`);
    }
  };

  const actionButtons = [
    {
      label: "Edit",
      icon: UnBlockIcon,
      onClick: handleEditClick,
    },
  ];

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
          />
        </div>
      )}
    </div>
  );
};
