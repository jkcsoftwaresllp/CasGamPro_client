// AgentHeaderLayout.js
import { Breadcrumbs } from "../../common/Breadcrumbs";
import { SearchBar } from "./dashboardContent/jsx/SearchBar";
import { DownloadButtons } from "./dashboardContent/jsx/DownloadBtn";
import { Pagination } from "../../common/Pagination";
import style from "./styles/ContentPage.module.css";
import { Filter } from "../../common/Filter";

export const AgentHeaderLayout = ({
  headerTitle,
  headerConfig,
  searchQuery,
  setSearchQuery,
  clients,
  paginationData,
}) => {
  return (
    <header className={style.headerContainer}>
      <div className={style.headerTop}>
        <h1 className={style.headerTitle}>{headerTitle}</h1>
        <div className={style.rightSideActions}>
          {headerConfig.showDownloadButtons && <Filter />}
          {headerConfig.showDownloadButtons && (
            <DownloadButtons clients={clients} />
          )}
          {headerConfig.showPagination && (
            <Pagination data={paginationData} rowsPerPage={30}>
              {() => null}
            </Pagination>
          )}
        </div>
      </div>

      {/* Show Breadcrumbs below the title */}
      {headerConfig.showBreadcrumbs && (
        <div className={style.breadcrumbsContainer}>
          <Breadcrumbs data={headerConfig.breadcrumbsData} />
        </div>
      )}

      {/* Show SearchBar if needed */}
      {(headerConfig.showSearchBar ||
        headerConfig.showDownloadButtons ||
        headerConfig.showPagination) && (
        <div className={style.headerActionsRow}>
          {headerConfig.showSearchBar && (
            <div className={style.searchBarWrapper}>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
};
