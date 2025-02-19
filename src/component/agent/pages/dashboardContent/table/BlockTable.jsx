import React, { useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { UnBlockIcon } from "../../../../../assets/assets.jsx";
import { showUnblockUserSwal } from "../helper/swalHelpers.js";
import { blockedClientsData } from "../helper/blockedClient";
import { Loader } from "../../../../common/Loader.jsx";
import style from "./Table.module.css";
import { useOutletContext } from "react-router-dom";

export const BlockTable = () => {
  const { searchQuery } = useOutletContext();
  const { loading, data } = blockedClientsData();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  // Convert data for the table
  const tableData = data.map((client) => ({
    id: client.id,
    username: client.username.toLowerCase(),
    matchCommission: client.matchCommission,
    sessionCommission: client.sessionCommission,
    share: client.share,
  }));

  // Filter data based on search query
  const filteredData = tableData.filter((client) =>
    client.username.includes(searchQuery.toLowerCase())
  );

  // Paginate filtered data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Handle pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.tableContent}>
          <Table
            data={currentData}
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
