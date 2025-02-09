import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { UnBlockIcon } from "../../../../../assets/assets.jsx";
import { showUnblockUserSwal } from "../helper/swalHelpers.js";
import { blockedClientsData } from "../helper/blockedClient";
import { Loader } from "../../../../common/Loader.jsx";
import style from "../../styles/ManageClient.module.css";
import { useOutletContext } from "react-router-dom"; // Import to get context

export const BlockTable = () => {
  const { searchQuery } = useOutletContext();
  const { loading, data } = blockedClientsData();

  // Convert data for the table
  const tableData = data.map((client) => ({
    id: client.id,
    username: client.username.toLowerCase(),
    matchCommission: client.matchCommission,
    sessionCommission: client.sessionCommission,
    share: client.share,
  }));

  // Filter data based on search query
  const filteredData = tableData.filter(
    (client) => client.username.includes(searchQuery.toLowerCase()) // Case-insensitive search
  );

  const columns = [
    { key: "id", label: "ID" },
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
    <div>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.manageCommissionsContainer}>
          <Table
            data={filteredData} // Use filtered data
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
