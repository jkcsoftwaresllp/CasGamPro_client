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

  const columns = [
    { key: "id", label: "User Id" },
    { key: "username", label: "User Name" },
    { key: "lotteryCommission", label: "Lottery Commission" },
    { key: "casinoCommission", label: "Casino Commission" },
    { key: "share", label: "Share" }, 
    { key: "actions", label: "Action" },
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
            data={data}
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
