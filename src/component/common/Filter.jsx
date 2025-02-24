import { useState } from "react";
import style from "./style/Filter.module.css";
import { Button } from "./Button";
import { FilterIcon } from "../../assets/assets";
import { IconBtn } from "./IconBtn";

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
                {["Date", "User ID", "Client Name", "Limit/Offset"].map(
                  (option) => (
                    <Button
                      key={option}
                      onClick={() => setSelectedFilter(option)}
                      label={option}
                    />
                  )
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
                  <label>Client Name</label>
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
                      {[10, 20, 30, 50, 100].map((num) => (
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
