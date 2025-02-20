import { Breadcrumbs } from "../../common/Breadcrumbs";
import { SearchBar } from "./dashboardContent/jsx/SearchBar";
import { DownloadButtons } from "./dashboardContent/jsx/DownloadBtn";
import { Pagination } from "../../common/Pagination";
import { Filter } from "../../common/Filter";
import style from "./styles/ContentPage.module.css";

export const AgentHeaderLayout = ({
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
    showPagination,
  } = headerConfig;

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
          {showSearchBar && (
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
          {showDownloadButtons && (
            <>
              <Filter onFilter={onFilter} />
              <DownloadButtons data={data} tableName={tableName} />
            </>
          )}
          {showPagination && (
            <Pagination data={paginationData} rowsPerPage={30}>
              {() => null}
            </Pagination>
          )}
        </div>
      </div>
    </header>
  );
};
