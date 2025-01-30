import React, { useState } from "react";
import { ClientTable } from "./table/ClientTable"; // Import the ClientTable component
import { SearchBar } from "./jsx/SearchBar"; // Import SearchBar component
import { DownloadButtons } from "./jsx/DownloadBtn"; // Import DownloadButtons component

import style from "../styles/ManageClient.module.css"; // Import styles
import { useNavigate } from "react-router-dom";

export const ManageClients = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const [clients] = useState([
    {
      id: 85800,
      username: "SP85800 (Ankur)",
      matchCommission: 0,
      sessionCommission: 0,
      share: 15,
    },
    {
      id: 85801,
      username: "SP85801 (Rahul)",
      matchCommission: 2,
      sessionCommission: 1,
      share: 20,
    },
    {
      id: 85802,
      username: "SP85802 (Priya)",
      matchCommission: 1.5,
      sessionCommission: 0.5,
      share: 18,
    },
    {
      id: 85803,
      username: "SP85803 (Vikram)",
      matchCommission: 0,
      sessionCommission: 2,
      share: 22,
    },
  ]);

  const handleCreateNewUser = () => {
    //have to correct this
    navigate("/agent/manageClients/addnewuser");
  };

  const filteredClients = clients.filter((client) =>
    client.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={style.manageClientsContainer}>
      <h1 className={style.header}> My Clients</h1>
      {/* Row for Search Bar and Buttons */}
      <div className={style.actionRow}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <DownloadButtons clients={filteredClients} />
      </div>

      {/* Client Table */}
      <ClientTable clients={filteredClients} />
    </div>
  );
};
