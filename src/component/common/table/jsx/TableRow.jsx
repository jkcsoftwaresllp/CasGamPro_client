import React from "react";
import { TableCell } from "./TableCell";
import style from "../style/Table.module.css";
import { IconBtncustom } from "../../IconBtncustom.jsx";

export const TableRow = ({
  row,
  columns,
  columnWidths,
  isAction,
  actionButtons,
  clickableColumns,
  onCellClick,
}) => {
  return (
    <div className={style.row}>
      {columns
        .filter((col) => col.key !== "actions") // Avoid duplicate rendering
        .map((col) => (
          <TableCell
            key={col.key}
            label={col.render ? col.render(row[col.key], row) : row[col.key]}
            style={{ flex: columnWidths[col.key] || 1 }}
            isClickable={clickableColumns.includes(col.key)}
            onClick={() =>
              clickableColumns.includes(col.key) &&
              onCellClick(row[col.key], row)
            }
          />
        ))}

      {isAction && actionButtons?.length > 0 && (
        <TableCell
          key="action"
          label={
            <div className={style.actions}>
              {actionButtons.map((btn, index) => (
                <IconBtncustom
                  key={index}
                  title={btn.label}
                  icon={btn.icon}
                  onClick={() => btn.onClick(row)}
                  className={`${style.actionBtn} ${btn.style}`}
                />
              ))}
            </div>
          }
          style={{ flex: columnWidths["actions"] || 1 }}
        />
      )}
    </div>
  );
};
