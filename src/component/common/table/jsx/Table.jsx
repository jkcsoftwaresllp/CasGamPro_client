import React from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import style from "../style/Table.module.css";

export const Table = ({
  data,
  columns,
  columnWidths = {},
  isAction = false,
  btns = [{ label: null, icon: null, onClick: null }],
}) => {
  return (
    <div className={style.table}>
      <TableHeader columns={columns} columnWidths={columnWidths} />
      <TableBody
        data={data}
        columns={columns}
        columnWidths={columnWidths}
        isAction={isAction}
        actionButtons={btns}
      />
    </div>
  );
};
