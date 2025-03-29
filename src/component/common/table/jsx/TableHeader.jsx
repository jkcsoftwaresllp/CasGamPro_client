import React from "react";
import { TableCell } from "./TableCell";
import style from "../style/Table.module.css";

export const TableHeader = ({ columns, columnWidths, isMinimunCellWidth }) => {
  return (
    <div className={style.header}>
      {columns.map((col) => (
        <TableCell
          key={col.key}
          label={col.label}
          style={{ flex: columnWidths[col.key] || 1 }}
          isHeader
          isMinimunCellWidth={isMinimunCellWidth}
        />
      ))}
    </div>
  );
};
