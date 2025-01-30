// ManageClients.jsx
import React, { useState } from "react";
import { BlockTable } from "./table/BlockTable"; // Import the ClientTable component
import { SearchBar } from "./jsx/SearchBar"; // Import SearchBar component
import { DownloadButtons } from "./jsx/DownloadBtn"; // Import DownloadButtons component

import style from "../styles/ManageClient.module.css"; // Import styles
import { useNavigate } from "react-router-dom";

export const BlockedClient = () => {
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
  ]);

  const filteredClients = clients.filter((client) =>
    client.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={style.manageClientsContainer}>
      {/* Row for Search Bar and Buttons */}
      <div className={style.actionRow}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <DownloadButtons clients={filteredClients} />
      </div>

      {/* Client Table */}
      <BlockTable clients={filteredClients} />
    </div>
  );
};
