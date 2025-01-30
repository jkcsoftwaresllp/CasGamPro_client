import React from "react";
import { TableRow } from "./TableRow";
import style from "../style/Table.module.css";

export const TableBody = ({
  data,
  columns,
  columnWidths,
  isAction,
  actionButtons,
}) => {
  return (
    <div className={style.body}>
      {data.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          row={row}
          columns={columns}
          columnWidths={columnWidths}
          isAction={isAction}
          actionButtons={actionButtons}
        />
      ))}
    </div>
  );
};
