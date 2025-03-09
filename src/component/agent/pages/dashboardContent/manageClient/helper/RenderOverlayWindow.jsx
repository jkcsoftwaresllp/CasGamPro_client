import { useEffect, useState } from "react";
import { TableOverWindow } from "../../TableOverWindow";
import { apiCall } from "../../../../../common/apiCall";

export const RenderOverlayWindow = ({ setIsOverlayView, tableName, id }) => {
  const responseCodes = ["CGP0169", "CGP0177", "CGP0173"];
  const [data, setData] = useState([]);

  const columnsCash = [
    { key: "date", label: "Date" },
    { key: "via", label: "Via" },
    { key: "liya", label: "Liya" },
    { key: "diya", label: "Diya" },
    { key: "remainingBalance", label: "Remaining Balance" },
  ];
  const columnWidthCash = { via: 2 };

  const columnsState = [
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "credit", label: "Credit" },
    { key: "debit", label: "Debit" },
    { key: "balance", label: "Balance" },
  ];
  const columnWidthState = { description: 2 };

  const columnsLedger = [
    { key: "date", label: "Date" },
    { key: "entry", label: "Entry" },
    { key: "debit", label: "Debit" },
    { key: "credit", label: "Credit" },
    { key: "balance", label: "Balance" },
  ];
  const columnWidthLedger = { entry: 2 };

  const items = {
    userLedger: { column: columnsLedger, width: columnWidthLedger },
    cashLedger: { column: columnsCash, width: columnWidthCash },
    userStatementLedger: { column: columnsState, width: columnWidthState },
  };

  useEffect(() => {
    const fetchLiveCasinoData = async () => {
      const response = await apiCall(
        `/auth-api/agent/${tableName}/${id}`,
        "GET"
      );
      console.log("API Response:", response);
      if (response && responseCodes.includes(response.uniqueCode)) {
        setData(response.data.results);
      } else console.error("API Error:", response.data);
    };

    fetchLiveCasinoData();
  }, []);

  return (
    <TableOverWindow
      data={data}
      columns={items[tableName].column}
      columnWidths={items[tableName].width}
      setIsOverlayView={setIsOverlayView}
    />
  );
};
