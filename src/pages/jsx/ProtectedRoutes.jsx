import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { apiCall } from "../../component/agent/pages/dashboardContent/manageClient/helper/apiCall";
import { Loader } from "../../component/common/Loader";
import { UserContext } from "../../context/userContext/UserContext";
import styles from "../styles/Routing.module.css";

export const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user, setUser } = useContext(UserContext);
  const [authState, setAuthState] = useState({
    loading: true,
    authorized: false,
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if the user is logged in and fetch their status from the server
        const response = await apiCall("/api/auth/status", "GET");

        if (
          response.status === "success" &&
          allowedRoles.includes(response.user.role)
        ) {
          setAuthState({ loading: false, authorized: true });
          setUser({ role: response.user.role, userId: response.user.userId }); // Update the context with the user role
          localStorage.setItem("userRole", response.user.role); // Optionally store the role in local storage
        } else {
          setAuthState({ loading: false, authorized: false });
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
        setAuthState({ loading: false, authorized: false });
      }
    };

    // If user role is already available in context or localStorage, bypass the check
    if (user.role || localStorage.getItem("userRole")) {
      setAuthState({
        loading: false,
        authorized: allowedRoles.includes(
          user.role || localStorage.getItem("userRole")
        ),
      });
    } else {
      checkAuthStatus(); // Otherwise, run the auth status check
    }
  }, [allowedRoles, user, setUser]);

  if (authState.loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader /> {/* Display loader while checking auth status */}
      </div>
    );
  }

  if (!authState.authorized) {
    return <Navigate to="/login" replace />; // Redirect to login if not authorized
  }

  return children; // Render protected content if authorized
};
