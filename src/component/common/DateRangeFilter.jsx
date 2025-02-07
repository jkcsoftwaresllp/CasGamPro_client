import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./style/DateRangeselector.module.css";

export const DateRangeFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 30 Days");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());

  const predefinedRanges = [
    { label: "Today", days: 0 },
    { label: "Yesterday", days: 1 },
    { label: "Last 7 Days", days: 7 },
    { label: "This Week", days: 7, startOfWeek: true },
    { label: "Last Week", days: 14, startOfLastWeek: true },
    { label: "Last 30 Days", days: 30 },
    { label: "This Month", startOfMonth: true },
    { label: "Last Month", lastMonth: true },
    { label: "Custom Range", custom: true },
  ];

  const handleSelectRange = (range) => {
    setSelectedRange(range.label);
    if (range.custom) return;

    let start,
      end = new Date();
    if (range.lastMonth) {
      start = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
      end = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
    } else if (range.startOfWeek) {
      const today = new Date();
      start = new Date(today.setDate(today.getDate() - today.getDay()));
    } else if (range.startOfLastWeek) {
      const today = new Date();
      start = new Date(today.setDate(today.getDate() - today.getDay() - 7));
      end = new Date(start);
      end.setDate(end.getDate() + 6);
    } else if (range.startOfMonth) {
      start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    } else {
      start = new Date(new Date().setDate(new Date().getDate() - range.days));
    }

    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>{selectedRange}</span>
        <span>📅</span>
      </button>

      {showDropdown && (
        <div className={styles.dropdown}>
          {predefinedRanges.map((range) => (
            <button
              key={range.label}
              className={`${styles.option} ${
                selectedRange === range.label ? styles.selected : ""
              }`}
              onClick={() => handleSelectRange(range)}
            >
              {range.label}
            </button>
          ))}

          {selectedRange === "Custom Range" && (
            <div className={styles.dateRange}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className={styles.input}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.apply}
              onClick={() => setShowDropdown(false)}
            >
              Apply
            </button>
            <button
              className={styles.clear}
              onClick={() => {
                setSelectedRange("Last 30 Days");
                setShowDropdown(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
