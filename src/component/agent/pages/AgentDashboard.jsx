import { useState, useEffect } from "react";
import { AgentSidebar as Sidebar } from "../main/jsx/AgentSidebar";
import { AgentHeaderLayout } from "./AgentHeaderLayout"; // Import the layout component
import style from "./styles/ContentPage.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { routesPathClient as path } from "../../routing/helper/routesPathClient";
import { apiCall } from "../../common/apiCall";

export const AgentDashboard = () => {
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [tableName, setTableName] = useState("report");
  const [headerConfig, setHeaderConfig] = useState({
    showBreadcrumbs: false,
    breadcrumbsData: [],
    showSearchBar: false,
    showDownloadButtons: false,
  });

  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    userId: "",
    clientName: "",
    agentId: "",
    limit: 30,
    offset: 0,
  });

  const agentPath = path.agent;
  const manageClients = path.manageClients;
  const blockClients = path.blockClients;
  const commision = path.commision;
  const companyLenDen = path.companyLenDen;
  const profitAndLoss = path.profitAndLoss;
  const inOut = path.inOut;
  const liveCasino = path.liveCasino;

  const commonPaths = [
    `${agentPath}${manageClients}`,
    `${agentPath}${blockClients}`,
    `${agentPath}${commision}`,
    `${agentPath}${companyLenDen}`,
    `${agentPath}${profitAndLoss}`,
    `${agentPath}${inOut}`,
    `${agentPath}${liveCasino}`,
  ];

  const apiEndpoints = {
    [manageClients]: "/auth-api/agent/players",
    [blockClients]: "/auth-api/agent/blocked",
    [commision]: "/auth-api/agent/commissionLimits",
    [companyLenDen]: "/auth-api/agent/ledger",
    [profitAndLoss]: "/auth-api/agent/profit-loss",
    [inOut]: "/auth-api/agent/inout",
    [liveCasino]: "/auth-api/agent/liveCasinoReports",
  };

  const pagesWithSearchBar = [...commonPaths];
  const pagesWithDownloadBtn = [...commonPaths];
  const pagesWithshowPagination = [...commonPaths];

  const fetchData = async () => {
    setLoading(true);
    try {
      const currentPath = location.pathname.split("/").pop();
      const endpoint = apiEndpoints[`/${currentPath}`];
      setTableName(currentPath);

      if (!endpoint) {
        console.warn("No API endpoint found for:", currentPath);
        setLoading(false);
        return;
      }

      const response = await apiCall(endpoint, "GET", null, {}, filters);
      console.log({ response });
      setData(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filters, location.pathname]);

  useEffect(() => {
    const currentPath = location.pathname;

    setHeaderConfig({
      showBreadcrumbs: currentPath.split("/").filter(Boolean).length >= 2,
      breadcrumbsData: currentPath.split("/").filter(Boolean),
      showSearchBar: pagesWithSearchBar.includes(currentPath),
      showDownloadButtons: pagesWithDownloadBtn.includes(currentPath),
      showPagination: pagesWithshowPagination.includes(currentPath),
    });
  }, [location.pathname]);

  return (
    <div className={style.pageContainer}>
      <Sidebar setHeaderTitle={setHeaderTitle} />
      <div className={style.content}>
        <AgentHeaderLayout
          headerTitle={headerTitle}
          headerConfig={headerConfig}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilter={setFilters}
          data={data}
          tableName={tableName}
        />

        {/* Content Section */}
        <div className={style.outlet}>
          <Outlet context={{ data, loading }} />
        </div>
      </div>
    </div>
  );
};
