import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { EditIcon, PasswordIcon } from "../../../../../assets/assets.jsx";
export const BlockTable = ({ clients }) => {
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
      onClick: (row) => console.log(`Edit client ${row.id}`),
    },
    {
      label: "Change Password",
      icon: PasswordIcon,

      onClick: (row) => console.log(`Change Password for client ${row.id}`),
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
