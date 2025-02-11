import style from "./style/Pagination.module.css";
import { useState } from "react";
import { PrevIcon, NextIcon, RefreshIcon } from "../../assets/assets.jsx";
import { IconBtncustom } from "./IconBtncustom.jsx";

export const Pagination = ({ data = [], rowsPerPage, children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Ensure data is not undefined and is an array
  if (!Array.isArray(data)) {
    console.error('Pagination component requires "data" to be an array');
    return null; // or return an empty div, based on your preference
  }

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div>
      <div className={style.paginationContainer}>
        <IconBtncustom
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          icon={PrevIcon}
        />

        <span className={style.pageIndicator}>
          Page {currentPage} of {totalPages}
        </span>
        <IconBtncustom
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          icon={NextIcon}
        />
        <IconBtncustom icon={RefreshIcon} onClick={() => setCurrentPage(1)} />
      </div>
      {children({ paginatedData, currentPage, totalPages, setCurrentPage })}
    </div>
  );
};
