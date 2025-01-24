import React from "react";
import style from "../style/Table.module.css";

export const TableCell = ({ label, style: cellStyle, isHeader = false }) => {
  return (
    <div
      className={`${style.cell} ${isHeader ? style.headerCell : ""}`}
      style={cellStyle}
    >
      {label}
    </div>
  );
};
