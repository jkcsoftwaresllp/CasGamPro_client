import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../../common/table/jsx/Table";
import style from "../../styles/CollectionReportCombined.module.css";
import { DownloadIcon } from "../../../../../assets/assets";
import { downloadPDF } from "../helper/paymentRecieve";
import { IconBtn } from "../../../../common/IconBtn";
import { routesPathClient as path } from "../../../../routing/helper/routesPathClient";

export const PaymentPaid = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([
    { id: 85800, name: "Ankur", balance: 1500 },
    { id: 85801, name: "Rahul", balance: 2300 },
    { id: 85802, name: "Priya", balance: 1200 },
    { id: 85803, name: "Shivam", balance: 3169 },
  ]);

  const columns = [
    { key: "client", label: "Client" },
    { key: "balance", label: "Balance" },
  ];

  const formattedClients = clients.map(({ id, name, balance }) => ({
    id,
    client: `CGP${id} (${name})`,
    balance,
  }));

  // Calculate total balance
  const totalBalance = useMemo(() => {
    return clients.reduce((sum, item) => sum + item.balance, 0);
  }, [clients]);

  const handleCellClick = (value, row) => {
    navigate(
      `${path.agent}${path.manageClients}${path.userInfo.replace(
        ":id",
        row.id
      )}`
    );
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.heading}>Payment Paid To (Dena Hai)</h2>
        <IconBtn
          icon={DownloadIcon}
          onClick={() =>
            downloadPDF(formattedClients, "Payment Paid To (Dena Hai)")
          }
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
