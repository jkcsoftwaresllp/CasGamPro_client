import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { EditIcon, SettingsIcon } from "../../../../../assets/assets.jsx";
import { routesPathClient as path } from "../../../../routing/helper/routesPathClient.js";
import style from "../../styles/ManageClient.module.css";
import { Loader } from "../../../../common/Loader.jsx";
import { manageClientsData } from "../helper/manageClient.js";
import { useOutletContext } from "react-router-dom";

export const ClientTable = ({}) => {
  const { searchQuery = "" } = useOutletContext() || {};
  const navigate = useNavigate();

  const { loading, data } = manageClientsData();

  const tableData = data.map((client) => ({
    id: client.id,
    username: client.username,
    matchCommission: client.matchCommission,
    sessionCommission: client.sessionCommission,
    share: client.share,
  }));
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
        ), // Navigating to edit page with client id
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      onClick: (row) => navigate(`/agent/managePassword/${row.id}`),
    },
  ];

  const handleCellClick = (value, row) => {
    navigate(
      `${path.agent}${path.manageClients}${path.userInfo.replace("id", row.id)}`
    );
  };

  return (
    <div>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={style.manageCommissionsContainer}>
          <Table
            data={data}
            columns={columns}
            columnWidths={columnWidths}
            isAction={true} // Indicating that action buttons should be shown
            btns={actionButtons} // Passing action buttons here
            clickableColumns={["username"]} // Make "entry" column clickable
            onCellClick={handleCellClick}
          />
        </div>
      )}
    </div>
  );
};
