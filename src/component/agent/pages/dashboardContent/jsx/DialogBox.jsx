import React, { useEffect, useState } from "react";
import { TableOverWindow } from "../TableOverWindow.jsx";
import { apiCall } from "../../../../common/apiCall.js";

export const DialogBox = ({ isOpen, onClose, header, clientId }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state

  useEffect(() => {
    if (isOpen && clientId) {
      fetchClientData(clientId);
    }
  }, [isOpen, clientId]);

  const fetchClientData = async (clientId) => {
    setLoading(true); // Start loading before the API call
    try {
      const response = await apiCall(
        `/auth-api/agent/exposure/${clientId}`,
        "GET"
      );
      console.log(response);
      if (
        response.uniqueCode === "CGP0059" ||
        response.uniqueCode === "CGP0060"
      ) {
        setTableData(response.data);
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      setTableData([]);
    } finally {
      setLoading(false); // Stop loading once the API call is complete
    }
  };

  const columns = [
    { key: "matchName", label: "Match Name" },
    { key: "marketFancyName", label: "Market/Fancy Name" },
    { key: "exposure", label: "Exposure" },
  ];

  if (!isOpen) return null;

  return (
    <TableOverWindow
      data={tableData}
      columns={columns}
      setIsOverlayView={onClose}
    />
  );
};
