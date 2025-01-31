import React, { useState, useEffect } from "react";
import { BlockTable } from "./table/BlockTable"; // Import the ClientTable component
import { SearchBar } from "./jsx/SearchBar"; // Import SearchBar component
import { DownloadButtons } from "./jsx/DownloadBtn"; // Import DownloadButtons component
import style from "../styles/ManageClient.module.css"; // Import styles
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../common/Loader"; // Import your Loader component

export const BlockedClient = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const [clients, setClients] = useState([]); // Empty initial clients state
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    // Simulate a delay to fetch data (replace with actual API call)
    const fetchClients = async () => {
      // Simulating a delay with setTimeout
      setTimeout(() => {
        const mockClients = [
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
        ];
        setClients(mockClients);
        setLoading(false);
      });
    };

    fetchClients();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const filteredClients = clients.filter((client) =>
    client.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={style.manageClientsContainer}>
      <h1 className={style.header}> Blocked Clients</h1>
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
