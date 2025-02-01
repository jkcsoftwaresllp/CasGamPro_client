import React from "react";
import { generatePDF, generateCSV } from "../helper/downloadHelper"; // Import helpers
import style from "../../styles/ManageClient.module.css"; // Import styles

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
