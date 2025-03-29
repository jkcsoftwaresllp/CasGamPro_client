import React from "react";
import style from "../style/Table.module.css";

export const TableCell = ({
  label,
  style: cellStyle,
  isHeader = false,
  isClickable = false,
  onClick,
  isMinimunCellWidth,
}) => {
  const cssVariable = {
    "--flexValue": cellStyle.flex,
    "--minumumWidth": isMinimunCellWidth
      ? `${parseFloat(cellStyle.flex) * 100}px`
      : `0px`,
  };

  return (
    <div
      className={`${style.cell} ${isHeader ? style.headerCell : ""}`}
      style={cssVariable}
      onClick={isClickable ? onClick : undefined}
    >
      <div
        className={`${isClickable ? style.clickableCell : ""} ${
          style.cellLabel
        }`}
      >
        {label}
      </div>
    </div>
  );
};
