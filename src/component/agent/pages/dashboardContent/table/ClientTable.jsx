import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { EditIcon, SettingsIcon } from "../../../../../assets/assets.jsx";

export const ClientTable = ({ clients }) => {
  const navigate = useNavigate();

  const tableData = clients.map((client) => ({
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
      onClick: (row) => navigate(`/editUser/${row.id}`), // Navigating to edit page with client id
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      onClick: (row) => console.log(`Settings for client ${row.id}`),
    },
  ];

  return (
    <Table
      data={tableData}
      columns={columns}
      columnWidths={columnWidths}
      isAction={true} // Indicating that action buttons should be shown
      btns={actionButtons} // Passing action buttons here
    />
  );
};
