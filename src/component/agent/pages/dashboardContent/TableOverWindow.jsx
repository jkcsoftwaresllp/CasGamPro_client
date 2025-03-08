import React from "react";
import style from "../styles/TableOverWindow.module.css";
import { closeIcon } from "../../../../assets/assets";
import { Table } from "../../../common/table/jsx/Table";
import { IconBtncustom } from "../../../common/IconBtncustom";

export const TableOverWindow = ({
  data,
  columns,
  columnWidths,
  isAction,
  clickableColumns = [],
  onCellClick = () => {},
  setIsOverlayView,
  btns = [{ label: null, icon: null, onClick: null }],
}) => {
  return (
    <div className={style.tableWindowWrapper}>
      <div className={style.tableWindow}>
        <div className={style.close}>
          <IconBtncustom
            icon={closeIcon}
            onClick={() => setIsOverlayView(false)}
          />
        </div>
        <Table
          data={data}
          columns={columns}
          columnWidths={columnWidths}
          isAction={isAction}
          clickableColumns={clickableColumns}
          onCellClick={onCellClick}
          btns={btns}
        />
      </div>
    </div>
  );
};
