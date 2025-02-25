import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

/**
 * Converts camelCase or snake_case keys into readable column names.
 * Example: "matchCommission" → "Match Commission"
 * @param {string} key
 * @returns {string} Formatted column name
 */
const formatColumnName = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters
    .replace(/_/g, " ") // Replace underscores with spaces
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters
};

/**
 * Generates a PDF report with structured or empty content.
 * @param {Array} data - Array of objects representing table rows.
 * @param {string} title - Title of the PDF document.
 * @param {string} filename - Filename for the exported PDF.
 */
export const generatePDF = (
  data,
  title = "Report",
  filename = "report.pdf"
) => {
  const doc = new jsPDF();
  const today = new Date().toLocaleDateString("en-GB");

  doc.setFontSize(14);
  doc.text(title, 20, 20);
  doc.text(`Date: ${today}`, 150, 20);

  if (!data || data.length === 0) {
    // If no data, display a centered message
    doc.setFontSize(12);
    doc.text(
      "There is no content to print in this report.\nEither the data is empty or try using different filters.",
      50,
      50
    );
  } else {
    // Extract column names dynamically and format them
    const tableColumns = Object.keys(data[0]).map(formatColumnName);
    const tableRows = data.map((row) => Object.values(row));

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 30,
      styles: { halign: "center", fontSize: 10 },
      headStyles: { halign: "center", fontSize: 12, fillColor: [41, 128, 185] }, // Blue header
    });
  }

  doc.save(filename);
};

/**
 * Generates a CSV file with formatted column headers.
 * @param {Array} data - Array of objects to be exported.
 * @param {string} filename - Filename for the exported CSV.
 */
export const generateCSV = (data, filename = "report.csv") => {
  let csv;
  if (!data || data.length === 0) {
    // Create CSV with an empty message
    csv = Papa.unparse([
      { Message: "There is no content to print in this report." },
      { Message: "Either the data is empty or try using different filters." },
    ]);
  } else {
    // Convert data to CSV with formatted column names
    const formattedData = data.map((row) => {
      const formattedRow = {};
      Object.keys(row).forEach((key) => {
        formattedRow[formatColumnName(key)] = row[key]; // Format headers
      });
      return formattedRow;
    });

    csv = Papa.unparse(formattedData);
  }

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
