import React, { useState } from "react";
import { ClientTable } from "./table/ClientTable"; // Import the ClientTable component
import { SearchBar } from "./jsx/SearchBar"; // Import SearchBar component
import { DownloadButtons } from "./jsx/DownloadBtn"; // Import DownloadButtons component
import style from "../styles/ManageClient.module.css"; // Import styles
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../common/Loader"; // Import your Loader component
import { manageClientsData } from "./helper/manageClient"; // Import the helper

export const ManageClients = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const { loading, filteredClients } = manageClientsData(searchQuery); // Use the helper hook

  const handleCreateNewUser = () => {
    // Navigate to create new user page
    navigate("/agent/manageClients/addnewuser"); // TODO: Update this with use variable from path
  };

  return (
    <div className={style.manageClientsContainer}>
      <h1 className={style.header}>My Clients</h1>

      <div className={style.actionRow}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <DownloadButtons clients={filteredClients} />
      </div>

      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <ClientTable clients={filteredClients} />
      )}
    </div>
  );
};
