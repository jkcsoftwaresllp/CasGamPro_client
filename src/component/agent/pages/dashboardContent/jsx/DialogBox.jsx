import React, { useEffect, useState } from "react";
import { Table } from "../../../../common/table/jsx/Table.jsx";
import { Button } from "../../../../common/Button.jsx";
import { closeIcon } from "../../../../../assets/assets.jsx"; // Import close icon
import styles from "../../styles/Dialog.module.css"; // Import styles

export const DialogBox = ({ isOpen, onClose, header, clientId }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (isOpen && clientId) {
      fetchClientData(clientId);
    }
  }, [isOpen, clientId]);

  const fetchClientData = async (clientId) => {
    try {
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                matchName: "Match 1",
                marketFancyName: "Market A",
                exposure: "1000",
              },
              {
                matchName: "Match 2",
                marketFancyName: "Market B",
                exposure: "-500",
              },
            ]),
          1000
        )
      );

      setTableData(response);
    } catch (error) {
      console.error("Error fetching client data:", error);
      setTableData([]);
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

        <h2 className="">{header}</h2>

        {tableData.length > 0 ? (
          <Table data={tableData} columns={columns} />
        ) : (
          <p className={styles.noData}>No data found.</p>
        )}

        {/* Close Button at Bottom */}
        <Button label="Close" onClick={onClose} />
      </div>
    </div>
  );
};
