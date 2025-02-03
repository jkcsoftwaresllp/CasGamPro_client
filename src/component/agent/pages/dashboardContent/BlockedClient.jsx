import React, { useState } from "react";
import { BlockTable } from "./table/BlockTable"; // Import the ClientTable component
import { SearchBar } from "./jsx/SearchBar"; // Import SearchBar component
import { DownloadButtons } from "./jsx/DownloadBtn"; // Import DownloadButtons component
import style from "../styles/ManageClient.module.css"; // Import styles
import { Loader } from "../../../common/Loader"; // Import your Loader component
import { blockedClientsData } from "./helper/blockedClient"; // Import the helper

export const BlockedClient = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { loading, filteredClients } = blockedClientsData(searchQuery); // Use the helper hook

  return (
    <div className={style.manageClientsContainer}>
      <h1 className={style.header}>Blocked Clients</h1>
      {/* Row for Search Bar and Buttons */}
      <div className={style.actionRow}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <DownloadButtons clients={filteredClients} />
      </div>

      {/* Show loader while loading */}
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader /> {/* Loader component while data is being fetched */}
        </div>
      ) : (
        // Client Table after data is fetched
        <BlockTable clients={filteredClients} />
      )}
    </div>
  );
};
