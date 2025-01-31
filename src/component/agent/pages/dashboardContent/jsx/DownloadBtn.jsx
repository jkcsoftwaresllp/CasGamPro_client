import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import style from "../../styles/ManageClient.module.css"; // Import styles

// Function to generate PDF with a table
const generatePDF = (clients) => {
  const doc = new jsPDF();

  // Get today's date in a readable format (DD-MM-YYYY)
  const today = new Date().toLocaleDateString("en-GB");

  // Add title and date
  doc.text("Clients Report", 20, 20);
  doc.text(`Date: ${today}`, 150, 20); // Show date at the top-right corner

  const tableColumn = [
    "Username",
    "Match Commission",
    "Session Commission",
    "Share",
  ];
  const tableRows = [];

  // Converting client data into table format
  clients.forEach((client) => {
    const clientData = [
      client.username,
      client.matchCommission,
      client.sessionCommission,
      client.share,
    ];
    tableRows.push(clientData);
  });

  // Generate table
  doc.autoTable({
    head: [tableColumn], // Column headers
    body: tableRows, // Data rows
    startY: 30, // Position of the table
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
