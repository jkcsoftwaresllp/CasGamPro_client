// AgentHeaderLayout.js
import { Breadcrumbs } from "../../common/Breadcrumbs";
import { SearchBar } from "./dashboardContent/jsx/SearchBar";
import style from "./styles/ContentPage.module.css";
import { DownloadButtons } from "./dashboardContent/jsx/DownloadBtn";
import {Pagina}

export const AgentHeaderLayout = ({
  headerTitle,
  headerConfig,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className={style.headerContainer}>
      <div className={style.headerTop}>
        <h1 className={style.headerTitle}>{headerTitle}</h1>
        {headerConfig.showBreadcrumbs && (
          <Breadcrumbs data={headerConfig.breadcrumbsData} />
        )}
      </div>
      {(headerConfig.showSearchBar || headerConfig.showDownloadButtons) && (
        <div className={style.headerActions}>
          {headerConfig.showSearchBar && (
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
        </div>
      )}
    </header>
  );
};
