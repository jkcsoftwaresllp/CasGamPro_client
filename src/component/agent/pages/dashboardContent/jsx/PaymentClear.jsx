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

export const PaymentClear = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user.userRole;
  const basePath = rolePathData[userRole];

  // // Sample clients data
  // const [data, setClients] = useState([
  //   { id: 85800, name: "Ankur", balance: 1500 },
  //   { id: 12345, name: "John", balance: 2000 },
  //   { id: 67890, name: "Doe", balance: 2500 },
  // ]);

  // Table columns
  const columns = [
    { key: "client", label: "Client" },
    { key: "balance", label: "Balance" },
  ];

  const formattedClients = data.map(({ id, name, balance }) => ({
    id,
    name,
    balance,
    client: `CGP${id} (${name})`,
  }));

  // Calculate total balance
  const totalBalance = useMemo(() => {
    return data.reduce((sum, item) => sum + item.balance, 0);
  }, [data]);

  // Handle table cell click (navigates to client details)
  const handleCellClick = (value, row) => {
    navigate(
      `${basePath}${path.manageClients}${path.userInfo.replace(":id", row.id)}`
    );
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.heading}>Payment Clear (Clear Hai)</h2>
        <IconBtncustom
          icon={DownloadIcon}
          onClick={() =>
            downloadPDF(formattedClients, "Payment Clear (Clear Hai)")
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
