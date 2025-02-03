import React from "react";
import { TableCell } from "./TableCell";
import style from "../style/Table.module.css";
import { IconBtn } from "../../../common/IconBtn.jsx"; // Assuming you have IconBtn component

export const TableRow = ({
  row,
  columns,
  columnWidths,
  isAction,
  actionButtons,
}) => {
  return (
    <div className={style.row}>
      {columns.map((col) => (
        <TableCell
          key={col.key}
          label={col.render ? col.render(row[col.key], row) : row[col.key]}
          style={{ flex: columnWidths[col.key] || 1 }}
        />
      ))}

      {isAction && (
        <TableCell
          label={
            <div className={style.actions}>
              {actionButtons?.map((btn, index) => (
                <IconBtn
                  key={index}
                  title={btn.label} // Show label as title (tooltip)
                  icon={btn.icon} // Render icon for button
                  onClick={() => btn.onClick(row)} // onClick function for button
                  className={`${style.actionBtn} ${btn.style}`} // Add styles if needed
                />
              ))}
            </div>
          }
          style={{ flex: columnWidths["actions"] || 1 }} // Set the width for the actions column
        />
      )}
    </div>
  );
};
