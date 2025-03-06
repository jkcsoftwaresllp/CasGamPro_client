import { Breadcrumbs } from "../../common/Breadcrumbs";
import { SearchBar } from "./dashboardContent/jsx/SearchBar";
import { DownloadButtons } from "./dashboardContent/jsx/DownloadBtn";
import { Pagination } from "../../common/Pagination";
import { Filter } from "../../common/Filter";
import style from "./styles/ContentPage.module.css";
import { useState, useEffect } from "react";
import { Button } from "../../common/Button";

export const TableHeader = ({
  headerTitle,
  headerConfig = {},
  searchQuery,
  setSearchQuery,
  data,
  onFilter,
  paginationData,
  tableName,
}) => {
  const {
    showBreadcrumbs,
    breadcrumbsData,
    showSearchBar,
    showDownloadButtons,
    // showPagination, // TODO : Fix this
  } = headerConfig;

  const showPagination = false;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showActions, setShowActions] = useState(!isMobile);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isSmallScreen);
      setShowActions(!isSmallScreen); // Auto-show on large screens, hide on small
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={style.headerContainer}>
      <div className={style.headerTop}>
        {/* Left Side: Title & Breadcrumbs */}
        <div className={style.leftSideTitle}>
          <h1 className={style.headerTitle}>{headerTitle}</h1>
          {showBreadcrumbs && <Breadcrumbs data={breadcrumbsData} />}
        </div>

        {/* Right Side: Actions */}
        <div className={style.rightSideActions}>
          {/* Mobile Actions Button */}
          {isMobile &&
            (showSearchBar || showDownloadButtons || showPagination) && (
              <div className={style.actionButton}>
                <Button
                  label={"Action"}
                  onClick={() => setShowActions(!showActions)}
                />
              </div>
            )}

          {/* Action Elements (Hidden in mobile unless toggled) */}
          {showActions && (
            <div className={style.actionsContainer}>
              {showSearchBar && (
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}
              {showDownloadButtons && (
                <>
                  <DownloadButtons data={data} tableName={tableName} />
                  <Filter onFilter={onFilter} />
                </>
              )}
              {showPagination && (
                <Pagination data={paginationData} rowsPerPage={30}>
                  {() => null}
                </Pagination>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
