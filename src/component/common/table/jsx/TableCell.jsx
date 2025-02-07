import React from "react";
import style from "../style/Table.module.css";

export const TableCell = ({
  label,
  style: cellStyle,
  isHeader = false,
  isClickable = false,
  onClick,
}) => {
  return (
    <div
      className={`${style.cell} ${isHeader ? style.headerCell : ""}`}
      style={cellStyle}
      onClick={isClickable ? onClick : undefined}
    >
      <div className={`${isClickable ? style.clickableCell : ""}`}>{label}</div>
    </div>
  );
};
