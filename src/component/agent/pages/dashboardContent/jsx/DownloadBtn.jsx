// DownloadButtons.jsx
import React from "react";
import { jsPDF } from "jspdf";
import Papa from "papaparse";
import style from "../../styles/ManageClient.module.css"; // Import styles

// Function to generate PDF
const generatePDF = (clients) => {
  const doc = new jsPDF();
  doc.text("Clients Report", 20, 20);
  let yOffset = 30; // Start y position for table

  clients.forEach((client, index) => {
    doc.text(
      `${client.username} - ${client.matchCommission} - ${client.sessionCommission} - ${client.share}`,
      20,
      yOffset + index * 10
    );
  });

  doc.save("clients-report.pdf");
};

// Function to generate CSV
const generateCSV = (clients) => {
  const csv = Papa.unparse(clients);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "clients-report.csv";
  link.click();
};

export const DownloadButtons = ({ clients }) => {
  return (
    <div className={style.downloadButtons}>
      <button className={style.pdfButton} onClick={() => generatePDF(clients)}>
        PDF
      </button>
      <button className={style.csvButton} onClick={() => generateCSV(clients)}>
        CSV
      </button>
    </div>
  );
};
