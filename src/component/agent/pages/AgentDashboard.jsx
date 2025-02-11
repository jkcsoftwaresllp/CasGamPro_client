import { useState, useEffect } from "react";
import { AgentSidebar as Sidebar } from "../main/jsx/AgentSidebar";
import style from "./styles/ContentPage.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumbs } from "../../common/Breadcrumbs";
import { SearchBar } from "./dashboardContent/jsx/SearchBar";
import { DownloadButtons } from "./dashboardContent/jsx/DownloadBtn";
import { routesPathClient as path } from "../../routing/helper/routesPathClient";

export const AgentDashboard = () => {
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [headerConfig, setHeaderConfig] = useState({
    showBreadcrumbs: false,
    breadcrumbsData: [],
    showSearchBar: false,
    showDownloadButtons: false,
  });

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    // Define full paths using the imported routesPathClient object
    const pagesWithSearchBar = [
      `${path.agent}${path.manageClients}`,
      `${path.agent}${path.blockClients}`,
      `${path.agent}${path.commision}`,
      `${path.agent}/limit`, // Assuming 'limit' is not in routesPathClient
    ];

    setHeaderConfig({
      showBreadcrumbs: currentPath.split("/").filter(Boolean).length >= 2, // Show breadcrumbs for depth >= 3
      breadcrumbsData: currentPath.split("/").filter(Boolean), // Format breadcrumbs
      showSearchBar: pagesWithSearchBar.includes(currentPath),
    });
  }, [location.pathname]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={style.pageContainer}>
      <Sidebar setHeaderTitle={setHeaderTitle} />
      <div className={style.content}>
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
<div className={style.outlet}>
          <Outlet
            context={{ setHeaderConfig, searchQuery: searchQuery || "" }}
          />
        </div>

      </div>
    </div>
  );
};
