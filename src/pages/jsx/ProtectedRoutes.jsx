import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiCall } from "../../component/agent/pages/dashboardContent/manageClient/helper/apiCall"; // Replace with the correct path to your API helper
import { Loader } from "../../component/common/Loader"; // Replace with your loading component
import styles from "../styles/Routing.module.css";

export const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track auth state
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // API call to validate login status
        const response = await apiCall("/api/auth/status", "GET");

        if (response.status === "success") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error checking authentication status:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
