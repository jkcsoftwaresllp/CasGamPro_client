import React from "react";
import { generatePDF, generateCSV } from "../helper/downloadHelper"; // Import helpers
import style from "../../styles/ManageClient.module.css"; // Import styles
import { Button } from "../../../../common/Button";

export const DownloadButtons = ({ data, tableName }) => {
  return (
    <div className={style.downloadButtons}>
      <Button label={"PDF"} onClick={() => generatePDF(data, "", tableName)} />
      <Button label={"CSV"} onClick={() => generateCSV(data, tableName)} />
    </div>
  );
};
