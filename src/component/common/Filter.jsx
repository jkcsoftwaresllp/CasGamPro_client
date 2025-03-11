import { useState } from "react";
import style from "./style/Filter.module.css";
import { Button } from "./Button";
import { FilterIcon } from "../../assets/assets";
import { IconBtn } from "./IconBtn";
import { useLocation } from "react-router-dom";

export const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    userId: "",
    clientName: "",
    limit: 30,
    offset: 0,
  });
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  // Define paths for each filter type
  const applyFilterType1 = [
    "daily-report",
    "companyLenDen",
    "inOut",
    "profitAndLoss",
    "ledger",
    "statement",
  ];
  const applyFilterType2 = ["manageClients", "blockClients", "commission"];
  const applyFilterType3 = [];

  // Define filters associated with each type
  const filterType1 = ["startDate", "endDate", "limit", "offset"];
  const filterType2 = ["clientName"];
  const filterType3 = [...filterType1, ...filterType2]; // Combination of both

  const dropdownLimit = [10, 20, 30, 50, 100];

  // Determine which filters to apply based on `currentPath`
  let applicableFilters = [];
  if (applyFilterType1.includes(currentPath)) {
    applicableFilters = filterType1;
  } else if (applyFilterType2.includes(currentPath)) {
    applicableFilters = filterType2;
  } else if (applyFilterType3.includes(currentPath)) {
    applicableFilters = filterType3;
  }

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const closeOverlay = () => setShowOptions(false);

  const applyFilters = () => {
    onFilter(filters);
    closeOverlay();
  };

  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        {!showOptions ? (
          <IconBtn icon={FilterIcon} onClick={() => setShowOptions(true)} />
        ) : (
          <>
            {/* Overlay Backdrop */}
            <div className={style.overlay} onClick={closeOverlay}></div>

            {/* Filter Options Modal */}
            <div className={style.filterOptionsModal}>
              <div className={style.filterOptions}>
                {/* Dynamically Render Available Filters */}
                {applicableFilters.includes("startDate") && (
                  <Button
                    onClick={() => setSelectedFilter("Date")}
                    label="Date"
                  />
                )}
                {applicableFilters.includes("userId") && (
                  <Button
                    onClick={() => setSelectedFilter("User ID")}
                    label="User ID"
                  />
                )}
                {applicableFilters.includes("clientName") && (
                  <Button
                    onClick={() => setSelectedFilter("Client Name")}
                    label="Client Name"
                  />
                )}
                {applicableFilters.includes("limit") && (
                  <Button
                    onClick={() => setSelectedFilter("Limit/Offset")}
                    label="Limit/Offset"
                  />
                )}
              </div>

              {selectedFilter === "Date" && (
                <>
                  <div className={style.formGroup}>
                    <label>Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleChange}
                      className={style.input}
                    />
                  </div>
                  <div className={style.formGroup}>
                    <label>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleChange}
                      className={style.input}
                    />
                  </div>
                </>
              )}

              {selectedFilter === "User ID" && (
                <div className={style.formGroup}>
                  <label>User ID</label>
                  <input
                    type="text"
                    name="userId"
                    value={filters.userId}
                    onChange={handleChange}
                    className={style.input}
                    placeholder="Enter User ID"
                  />
                </div>
              )}

              {selectedFilter === "Client Name" && (
                <div className={style.formGroup}>
                  <label>User Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={filters.clientName}
                    onChange={handleChange}
                    className={style.input}
                    placeholder="Enter Client Name"
                  />
                </div>
              )}

              {selectedFilter === "Limit/Offset" && (
                <>
                  <div className={style.formGroup}>
                    <label>Limit</label>
                    <select
                      name="limit"
                      value={filters.limit}
                      onChange={handleChange}
                      className={style.select}
                    >
                      {dropdownLimit.map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={style.formGroup}>
                    <label>Offset</label>
                    <input
                      type="number"
                      name="offset"
                      value={filters.offset}
                      onChange={handleChange}
                      className={style.input}
                    />
                  </div>
                </>
              )}

              {selectedFilter && (
                <button className={style.button} onClick={applyFilters}>
                  Apply Filters
                </button>
              )}

              <button className={style.closeBtn} onClick={closeOverlay}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
