import jsPDF from "jspdf";
import "jspdf-autotable";

export const downloadPDF = (clients) => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString();

  doc.setFontSize(12);
  doc.text("Payment Receiving From", 20, 20);
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

  doc.save("Payment_Receiving_Report.pdf");
};
