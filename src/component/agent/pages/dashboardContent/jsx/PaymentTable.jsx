import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../../common/table/jsx/Table";
import style from "../../styles/CollectionReportCombined.module.css";
import { DownloadIcon } from "../../../../../assets/assets";
import { downloadPDF } from "../helper/paymentRecieve";
import { routesPathClient as path } from "../../../../routing/helper/routesPathClient";
import { IconBtncustom } from "../../../../common/IconBtncustom";
import { useAuth } from "../../../../../context/jsx/AuthContext";
import { rolePathData } from "../../../../panels/dashboard/AgentDashboard";

export const PaymentTable = ({ data, title }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user.userRole;
  const basePath = rolePathData[userRole];

  const columns = [
    { key: "client", label: "Client" },
    { key: "balance", label: "Balance" },
  ];

  const formattedClients = data.map(({ id, name, balance }) => ({
    id,
    client: `${id} (${name})`,
    balance,
  }));

  // Calculate total balance
  const totalBalance = useMemo(
    () => data.reduce((sum, item) => sum + item.balance, 0),
    [data]
  );

  // Handle table cell click (navigates to client details)
  const handleCellClick = (value, row) => {
    navigate(
      `${basePath}${path.manageClients}${path.userInfo.replace(":id", row.id)}`
    );
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.heading}>{title}</h2>
        <IconBtncustom
          icon={DownloadIcon}
          onClick={() => downloadPDF(formattedClients, title)}
        />
      </div>
      <div className={style.tableContainer}>
        <Table
          data={formattedClients}
          columns={columns}
          clickableColumns={["client"]}
          onCellClick={handleCellClick}
        />
      </div>
      <div className={style.totalBalance}>Total Balance: {totalBalance}</div>
    </div>
  );
};
