import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

// Function to generate PDF with a table
export const generatePDF = (clients) => {
  const doc = new jsPDF();
  const today = new Date().toLocaleDateString("en-GB");

  doc.setFontSize(12);
  doc.text("Clients Report", 20, 20);
  doc.text(`Date: ${today}`, 150, 20);

  const tableColumn = [
    "Username",
    "Match Commission",
    "Session Commission",
    "Share",
  ];
  const tableRows = clients.map((client) => [
    client.username,
    client.matchCommission,
    client.sessionCommission,
    client.share,
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: { halign: "center", fontSize: 12 },
    headStyles: { halign: "center", fontSize: 15 },
  });

  doc.save("clients-report.pdf");
};

// Function to generate CSV
export const generateCSV = (clients) => {
  const csv = Papa.unparse(clients);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "clients-report.csv";
  link.click();
};
