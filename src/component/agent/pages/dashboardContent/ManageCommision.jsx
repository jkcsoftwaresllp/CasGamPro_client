import React, { useState } from "react";
import { CommissionTable } from "./CommisionTable"; // Import the CommissionTable component
import { SearchBar } from "./jsx/SearchBar"; // Import SearchBar component

import style from "../styles/ManageClient.module.css"; // Import styles
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../common/Loader"; // Import your Loader component
import { manageCommissionData } from "./helper/commision"; // Import the helper

export const ManageCommissions = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const { loading, filteredCommissions } = manageCommissionData(searchQuery);
  return (
    <div className={style.manageCommissionsContainer}>
      <h1 className={style.header}>Manage Commissions</h1>

      {/* Search Bar */}
      <div className={style.actionRow}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Loader */}
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        // Commission Table
        <CommissionTable clients={filteredCommissions} />
      )}
    </div>
  );
};
