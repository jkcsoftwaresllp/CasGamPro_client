import { useState, useEffect } from "react";
import { AgentSidebar as Sidebar } from "../main/jsx/AgentSidebar";
import { AgentHeaderLayout } from "./AgentHeaderLayout"; // Import the layout component
import style from "./styles/ContentPage.module.css";
import { Outlet, useLocation } from "react-router-dom";
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

    const pagesWithSearchBar = [
      `${path.agent}${path.manageClients}`,
      `${path.agent}${path.blockClients}`,
      `${path.agent}${path.commision}`,
      `${path.agent}/limit`, // Assuming 'limit' is not in routesPathClient
    ];
    const pagesWithDownloadBtn = [
      `${path.agent}${path.manageClients}`,
      `${path.agent}${path.blockClients}`,
      `${path.agent}${path.commision}`,
      `${path.agent}${path.companyLenDen}`,
      `${path.agent}${path.profitAndLoss}`,
      `${path.agent}${path.inOut}`,
      `${path.agent}/limit`, // Assuming 'limit' is not in routesPathClient
    ];
    const pagesWithshowPagination = [
      `${path.agent}${path.manageClients}`,
      `${path.agent}${path.blockClients}`,
      `${path.agent}${path.commision}`,
      `${path.agent}${path.companyLenDen}`,
      `${path.agent}${path.profitAndLoss}`,
      `${path.agent}${path.inOut}`,
      `${path.agent}/limit`, // Assuming 'limit' is not in routesPathClient
    ];

    setHeaderConfig({
      showBreadcrumbs: currentPath.split("/").filter(Boolean).length >= 2, // Show breadcrumbs for depth >= 3
      breadcrumbsData: currentPath.split("/").filter(Boolean), // Format breadcrumbs
      showSearchBar: pagesWithSearchBar.includes(currentPath),
      showDownloadButtons: pagesWithDownloadBtn.includes(currentPath),
      showPagination: pagesWithshowPagination.includes(currentPath),
    });
  }, [location.pathname]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={style.pageContainer}>
      <Sidebar setHeaderTitle={setHeaderTitle} />
      <div className={style.content}>
        {/* Use AgentHeaderLayout component for the header */}
        <AgentHeaderLayout
          headerTitle={headerTitle}
          headerConfig={headerConfig}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Content Section */}
        <div className={style.outlet}>
          <Outlet
            context={{ setHeaderConfig, searchQuery: searchQuery || "" }}
          />
        </div>
      </div>
    </div>
  );
};
