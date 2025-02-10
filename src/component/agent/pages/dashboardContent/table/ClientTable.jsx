import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { EditIcon, SettingsIcon } from "../../../../../assets/assets.jsx";
import { routesPathClient as path } from "../../../../routing/helper/routesPathClient.js";
import style from "../../styles/Common.module.css";
import { Loader } from "../../../../common/Loader.jsx";
import { manageClientsData } from "../helper/manageClient.js";
import { DownloadButtons } from "../jsx/DownloadBtn.jsx";
import { Button } from "../../../../common/Button.jsx"; // Import Button component

export const ClientTable = () => {
  const navigate = useNavigate();
  const { loading, data } = manageClientsData();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20; // Number of rows per page

  // Paginate data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const tableData = currentData.map((client) => ({
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

  const actionButtons = [
    {
      label: "Edit",
      icon: EditIcon,
      onClick: (row) =>
        navigate(
          `${path.agent}${path.manageClients}${path.editUser.replace(
            ":id",
            row.id
          )}`
        ),
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      onClick: (row) => navigate(`/agent/managePassword/${row.id}`),
    },
  ];

  const handleCellClick = (value, row) => {
    navigate(
      `${path.agent}${path.manageClients}${path.userInfo.replace(
        ":id",
        row.id
      )}`
    );
  };

  // Handle pagination
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.manageCommissionsContainer}>
          <div className={style.paginationContainer}>
            <Button
              label="Previous"
              onClick={prevPage}
              disabled={currentPage === 1}
            />
            <span className={style.pageIndicator}>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              label="Next"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            />

            <DownloadButtons clients={data} />
          </div>
          <Table
            data={tableData}
            columns={columns}
            columnWidths={columnWidths}
            isAction={true}
            btns={actionButtons}
            clickableColumns={["username"]}
            onCellClick={handleCellClick}
          />
          {/* Pagination Controls */}
        </div>
      )}
    </div>
  );
};
