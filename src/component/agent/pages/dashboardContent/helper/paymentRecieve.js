import jsPDF from "jspdf";
import "jspdf-autotable";

export const downloadPDF = (clients, title) => {
  const doc = new jsPDF();

  // Format the date as "6 Feb 2025"
  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options); // "6 Feb 2025"
  };

  const currentDate = formatDate(new Date());

  doc.setFontSize(12);
  doc.text(title, 20, 20);
  doc.text(currentDate, 160, 20, { align: "right" });

  const tableColumn = ["Client", "Balance"];
  const tableRows = clients.map((client) => [client.client, client.balance]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: { halign: "center", fontSize: 12 },
    headStyles: { halign: "center", fontSize: 15, fillColor: [0, 123, 255] },
  });

  const totalBalance = clients.reduce((sum, item) => sum + item.balance, 0);
  doc.setFontSize(16);
  doc.text(
    `Total Balance: ${totalBalance}`,
    160,
    doc.autoTable.previous.finalY + 10,
    { align: "right" }
  );

  doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
};
