import React from "react";
import { generatePDF, generateCSV } from "../helper/downloadHelper"; // Import helpers
import style from "../../styles/ManageClient.module.css"; // Import styles

export const DownloadButtons = ({ data, tableName }) => {
  return (
    <div className={style.downloadButtons}>
      <button
        className={style.pdfButton}
        onClick={() => generatePDF(data, "", tableName)}
      >
        PDF
      </button>
      <button
        className={style.csvButton}
        onClick={() => generateCSV(data, tableName)}
      >
        CSV
      </button>
    </div>
  );
};
