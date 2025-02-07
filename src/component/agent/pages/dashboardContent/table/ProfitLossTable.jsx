import React from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";

export const ProfitLossTable = ({ data }) => {
  const tableData = data.map((entry) => ({
    date: entry.date,
    roundId: entry.rountId,
    roundTitle: entry.roundTitle,
    roundEarning: entry.roundEarning,
    commissionEarning: entry.commissionEarning,
    totalEarning: entry.totlaEarning,
  }));

  const columns = [
    { key: "date", label: "Date" },
    { key: "roundId", label: "Round ID" },
    { key: "roundTitle", label: "Round Title" },
    { key: "roundEarning", label: "Round Earning" },
    { key: "commissionEarning", label: "Commission Earning" },
    { key: "totalEarning", label: "Total Earning" },
  ];

  const columnWidths = { date: 0.5, roundTitle: 2 };

  
  const handleCellClick = (value, row) => {
    // navigate(
    //   `${path.agent}${path.manageClients}${path.userInfo.replace(
    //     ":id",
    //     row.id
    //   )}`
    // );

    console.log("Cell clicked", value, row);
  };

  return (
    <Table
      data={tableData}
      columns={columns}
      columnWidths={columnWidths}
      isAction={false} // No action buttons required
      clickableColumns={["roundId"]}
      onCellClick={handleCellClick}
    />
  );
};
