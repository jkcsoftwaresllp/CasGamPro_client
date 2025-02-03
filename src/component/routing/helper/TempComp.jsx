import React from "react";

export const TempComp = ({ label }) => {
  return (
    <div
      style={{
        width: "100%",
        height: `calc(100vh - var(--header-height))`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "var(--color-text-primary)",
        fontWeight: "bold",
      }}
    >
      {label}
    </div>
  );
};
