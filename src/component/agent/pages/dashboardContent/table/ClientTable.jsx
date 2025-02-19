import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { EditIcon, SettingsIcon } from "../../../../../assets/assets.jsx";
import { routesPathClient as path } from "../../../../routing/helper/routesPathClient.js";
import { Loader } from "../../../../common/Loader.jsx";
import { manageClientsData } from "../helper/manageClient.js";
import style from "./Table.module.css";
// import style from "../../styles/Common.module.css";

import { useOutletContext } from "react-router-dom";

export const ClientTable = () => {
  const navigate = useNavigate();
  const { loading, data } = manageClientsData();
  const outletContext = useOutletContext() || {};
  const { searchQuery = "" } = outletContext;

  const tableData = data.map((client) => ({
    id: client.id,
    username: `${client.firstName} ${client.lastName} (${client.userName})`,
    casinoCommission: client.casinoCommission,
    lotteryCommission: client.lotteryCommission,
    share: client.matchShare,
  }));

  const filteredData = tableData.filter((client) =>
    client.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: "id", label: "ID" },
    { key: "username", label: "UserName" },
    { key: "casinoCommission", label: "Casino Commission" },
    { key: "lotteryCommission", label: "Lottery Commission" },
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

  return (
    <div className={style.tableContainer}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.tableContent}>
          <Table
            data={filteredData}
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
