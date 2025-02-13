import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../../common/table/jsx/Table";
import style from "../../styles/CollectionReportCombined.module.css";
import { DownloadIcon } from "../../../../../assets/assets";
import { downloadPDF } from "../helper/paymentRecieve";
import { routesPathClient as path } from "../../../../routing/helper/routesPathClient";
import { IconBtncustom } from "../../../../common/IconBtncustom";

export const PaymentRecieve = ({ data }) => {
  const navigate = useNavigate();

  // const [data, setClients] = useState([
  //   { id: 85800, name: "Ankur", balance: 1500 },
  //   { id: 85801, name: "Rahul", balance: 2300 },
  //   { id: 85802, name: "Priya", balance: 1200 },
  //   { id: 85803, name: "Shivam", balance: 3169 },
  //   { id: 85804, name: "Neha", balance: 1800 },
  // ]);

  const columns = [
    { key: "client", label: "Client" },
    { key: "balance", label: "Balance" },
  ];

  // Format client data with proper client representation
  const formattedClients = data.map(({ id, name, balance }) => ({
    id,
    client: `CGP${id} (${name})`,
    balance,
  }));

  // Calculate total balance
  const totalBalance = useMemo(() => {
    return data.reduce((sum, item) => sum + item.balance, 0);
  }, [data]);

  // Handle table cell click (navigates to client details)
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
        <h2 className={style.heading}>Payment Receiving From (Lena Hai)</h2>
        <IconBtncustom
          icon={DownloadIcon}
          onClick={() =>
            downloadPDF(formattedClients, "Payment Receiving From (Lena Hai)")
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
