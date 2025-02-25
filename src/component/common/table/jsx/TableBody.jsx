import React from "react";
import { TableRow } from "./TableRow";
import style from "../style/Table.module.css";

export const TableBody = ({
  data,
  columns,
  columnWidths,
  isAction,
  actionButtons,
  clickableColumns,
  onCellClick,
}) => {
  return (
    <div className={style.body}>
      {data.length === 0 ? (
        <p className={style.emptyMsg}>No Records to Show</p>
      ) : (
        data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            row={row}
            columns={columns}
            columnWidths={columnWidths}
            isAction={isAction}
            actionButtons={actionButtons}
            clickableColumns={clickableColumns}
            onCellClick={onCellClick}
          />
        ))
      )}
    </div>
  );
};
