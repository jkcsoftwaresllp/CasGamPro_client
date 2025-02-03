import React from "react";
import style from "../../styles/ManageClient.module.css";

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      className={style.searchBar}
      placeholder="Search by username..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
    />
  );
};
