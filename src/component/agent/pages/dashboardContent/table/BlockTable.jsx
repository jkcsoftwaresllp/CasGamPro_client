import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { UnBlockIcon } from "../../../../../assets/assets.jsx";
import { showUnblockUserSwal } from "../helper/swalHelpers.js"; // Import Swal function
import { blockedClientsData } from "../helper/blockedClient";
import { Loader } from "../../../../common/Loader.jsx";
import style from "../../styles/ManageClient.module.css";
export const BlockTable = ({}) => {
  const { loading, data } = blockedClientsData();
  const tableData = data.map((client) => ({
    id: client.id,
    username: client.username,
    matchCommission: client.matchCommission,
    sessionCommission: client.sessionCommission,
    share: client.share,
  }));

  const columns = [
    { key: "id", label: "ID" },
    { key: "username", label: "UserName" },
    { key: "matchCommission", label: "Match Commission" },
    { key: "sessionCommission", label: "Session Commission" },
    { key: "share", label: "Share" },
    { key: "actions", label: "Actions" },
  ];

  const columnWidths = { username: 2, actions: 2 };

  // Function to handle Edit click
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
      onClick: handleEditClick, // Use helper function
    },
  ];

  return (
    <div>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.manageCommissionsContainer}>
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
