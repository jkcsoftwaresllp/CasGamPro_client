import React, { useRef, useEffect } from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import style from "../style/Table.module.css";

export const Table = ({
  data,
  columns,
  columnWidths = {},
  isAction = false,
  btns = [{ label: null, icon: null, onClick: null }],
  clickableColumns = [],
  onCellClick = () => {},
}) => {
  const bodyRef = useRef(null);
  const headerRef = useRef(null);
  const isSyncingRef = useRef(false); // Prevent infinite loops

  useEffect(() => {
    const header = headerRef.current;
    const body = bodyRef.current;

    if (!header || !body) return;

    const handleScroll = (source, target) => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;

      if (target.scrollLeft !== source.scrollLeft) {
        target.scrollLeft = source.scrollLeft;
      }

      isSyncingRef.current = false;
    };

    const handleHeaderScroll = () => handleScroll(header, body);
    const handleBodyScroll = () => handleScroll(body, header);

    header.addEventListener("scroll", handleHeaderScroll);
    body.addEventListener("scroll", handleBodyScroll);

    return () => {
      header.removeEventListener("scroll", handleHeaderScroll);
      body.removeEventListener("scroll", handleBodyScroll);
    };
  }, []);

  return (
    <div className={style.tableWrapper}>
      {/* Table Header - Fixed at Top */}
      <div className={style.headerWrapper} ref={headerRef}>
        <TableHeader
          headerRef={headerRef}
          columns={columns}
          columnWidths={columnWidths}
        />
      </div>

      {/* Table Body - Scrollable */}
      <div className={style.bodyWrapper}>
        <TableBody
          bodyRef={bodyRef}
          data={data}
          columns={columns}
          columnWidths={columnWidths}
          isAction={isAction}
          actionButtons={btns}
          clickableColumns={clickableColumns}
          onCellClick={onCellClick}
        />
      </div>
    </div>
  );
};
