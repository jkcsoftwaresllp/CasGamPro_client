import React from "react";
import { TableCell } from "./TableCell";
import style from "../style/Table.module.css";
import { IconBtn } from "../../../common/IconBtn.jsx"; // Assuming you have IconBtn component

export const TableRow = ({ row, columns, columnWidths }) => {
  return (
    <div className={style.row}>
      {columns.map((col) => (
        <TableCell
          key={col.key}
          label={col.render ? col.render(row[col.key], row) : row[col.key]}
          style={{ flex: columnWidths[col.key] || 1 }}
        />
      ))}
    </div>
  );
};
