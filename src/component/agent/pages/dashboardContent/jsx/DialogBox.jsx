import React, { useEffect, useState, useMemo, useCallback } from "react";
import { TableOverWindow } from "../TableOverWindow.jsx";
import { apiCall } from "../../../../common/apiCall.js";

export const DialogBox = ({ isOpen, onClose, header, clientId, tableName }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const uniqueCodes = ["CGP0164", "CGP0177", "CGP0059", "CGP0060"];

  // Ensure fetchClientData gets updated dependencies
  const fetchClientData = useCallback(async () => {
    if (!clientId || !tableName) return; // Prevent invalid API calls

    setLoading(true);
    let URL = "";

    switch (tableName) {
      case "Expo":
        URL = `/auth-api/panel/exposure/${clientId}`;
        break;
      case "ProfitLoss":
        URL = `/auth-api/panel/clientPL/${clientId}`;
        break;
      case "Statement":
        URL = `/auth-api/panel/userStatementLedger/${clientId}`;
        break;
      default:
        console.error("Invalid table name:", tableName);
        setLoading(false);
        return;
    }

    console.log("Fetching data from:", URL); // Debugging log

    try {
      const response = await apiCall(URL, "GET");
      console.log("API Response:", response);

      if (response && uniqueCodes.includes(response.uniqueCode)) {
        setTableData(response.data?.results || []);
      } else {
        console.warn("Unique code mismatch or empty response.");
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  }, [clientId, tableName]); // Include dependencies to update function

  // Fetch data when isOpen changes or dependencies update
  useEffect(() => {
    if (isOpen) {
      fetchClientData();
    }
  }, [isOpen, fetchClientData]); // Ensure useEffect runs when `isOpen`, `clientId`, or `tableName` changes

  // Memoized columns
  const columns = useMemo(() => {
    switch (tableName) {
      case "Expo":
        return [
          { key: "matchName", label: "Match Name" },
          { key: "marketFancyName", label: "Market/Fancy Name" },
          { key: "exposure", label: "Exposure" },
        ];
      case "ProfitLoss":
        return [
          { key: "date", label: "Date" },
          { key: "roundId", label: "Round ID" },
          { key: "roundTitle", label: "Round Title" },
          { key: "roundEarning", label: "Win/Loss Amount" },
          { key: "commissionEarning", label: "Commission Earning" },
          { key: "totalEarning", label: "Total Earning" },
        ];
      case "Statement":
        return [
          { key: "date", label: "Date" },
          { key: "description", label: "Description" },
          { key: "debit", label: "Debit" },
          { key: "credit", label: "Credit" },
          { key: "balance", label: "Balance" },
        ];
      default:
        return [];
    }
  }, [tableName]);

  if (!isOpen) return null;

  return (
    <TableOverWindow
      data={tableData}
      columns={columns}
      setIsOverlayView={onClose}
    />
  );
};
