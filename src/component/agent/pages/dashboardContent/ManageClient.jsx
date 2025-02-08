import React, { useState } from "react";
import { ClientTable } from "./table/ClientTable";
import { SearchBar } from "./jsx/SearchBar";
import { DownloadButtons } from "./jsx/DownloadBtn";
import style from "../styles/ManageClient.module.css";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../common/Loader";
import { manageClientsData } from "./helper/manageClient";
import { Breadcrumbs } from "../../../common/Breadcrumbs";
export const ManageClients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { loading, filteredClients } = manageClientsData(searchQuery);

  const handleCreateNewUser = () => {
    navigate("/agent/manageClients/addnewuser");
  };

  return (
    <div className={style.manageClientsContainer}>
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
