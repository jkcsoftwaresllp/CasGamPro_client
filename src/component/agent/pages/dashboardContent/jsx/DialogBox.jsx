import React, { useEffect, useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Button } from "../../../../common/Button.jsx";
import { closeIcon } from "../../../../../assets/assets.jsx"; // Import close icon
import styles from "../../styles/Dialog.module.css"; // Import styles

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
      const response = await fetch(`/agent/exposure/${clientId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch exposure data");
      }
      const data = await response.json();
      const formattedData = data.map((item) => ({
        matchName: item.matchName, // Assuming the API returns matchName, marketFancyName, and exposure
        marketFancyName: item.marketFancyName,
        exposure: item.exposure,
      }));
      setTableData(formattedData);
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
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        {/* Close Button on Top Right */}
        <button className={styles.closeButton} onClick={onClose}>
          {closeIcon}
        </button>

        <h2>{header}</h2>

        {loading ? (
          <p>Loading...</p> // Show loading text while waiting for API data
        ) : tableData.length > 0 ? (
          <Table data={tableData} columns={columns} />
        ) : (
          <p className={styles.noData}>No data found.</p>
        )}
      </div>
    </div>
  );
};
