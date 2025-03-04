import React from "react";
import style from "../style/Table.module.css";

export const TableCell = ({
  label,
  style: cellStyle,
  isHeader = false,
  isClickable = false,
  onClick,
}) => {
  const cssVariable = {
    "--flexValue": cellStyle.flex,
  };
  console.log(cssVariable);

  return (
    <div
      className={`${style.cell} ${isHeader ? style.headerCell : ""}`}
      style={cssVariable}
      onClick={isClickable ? onClick : undefined}
    >
      <div className={`${isClickable ? style.clickableCell : ""}`}>{label}</div>
    </div>
  );
};
