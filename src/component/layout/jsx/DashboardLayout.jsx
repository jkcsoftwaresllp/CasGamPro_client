import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import style from "../style/ContentPage.module.css";
import { apiCall } from "../../common/apiCall";
import { filterDataBySearch } from "../helper/filterUtils";
import { TableHeader } from "../../agent/pages/TableHeader";

export const DashboardLayout = ({
  sidebarComponent: Sidebar,
  apiEndpoints,
  defaultHeaderTitle = "Dashboard",
  tableURLRoutes,
}) => {
  const [headerTitle, setHeaderTitle] = useState(defaultHeaderTitle);
  const [searchQuery, setSearchQuery] = useState("");
  const [tableName, setTableName] = useState("");
  const [headerConfig, setHeaderConfig] = useState({
    showBreadcrumbs: false,
    breadcrumbsData: [],
    showSearchBar: false,
    showDownloadButtons: false,
  });

  const location = useLocation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const currentPath = location.pathname.split("/").pop();
      const endpoint = apiEndpoints[`/${currentPath}`];
      setTableName(currentPath);

      if (!endpoint) {
        // console.warn("No API endpoint found for:", currentPath); // This Route do not have any table
        setLoading(false);
        return;
      }

      console.log(endpoint);

      const response = await apiCall(endpoint, "GET", null, {}, filters);
      console.log(response);
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
    setFilteredData(filterDataBySearch(data, searchQuery));
  }, [searchQuery, data]);

  useEffect(() => {
    const currentPath = location.pathname;

    setHeaderConfig({
      showBreadcrumbs: currentPath.split("/").filter(Boolean).length >= 2,
      breadcrumbsData: currentPath.split("/").filter(Boolean),
      showSearchBar: tableURLRoutes.includes(`${currentPath}`),
      showDownloadButtons: tableURLRoutes.includes(`${currentPath}`),
      showPagination: tableURLRoutes.includes(`${currentPath}`),
    });
  }, [location.pathname]);

  return (
    <div className={style.pageContainer}>
      {Sidebar && <Sidebar setHeaderTitle={setHeaderTitle} />}
      <div className={style.content}>
        <TableHeader
          headerTitle={headerTitle}
          headerConfig={headerConfig}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilter={setFilters}
          data={filteredData}
          tableName={tableName}
        />

        {/* Content Section */}
        <div className={style.outlet}>
          <Outlet context={{ data: filteredData, loading }} />
        </div>
      </div>
    </div>
  );
};
