import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../../component/common/Loader";
import { UserContext } from "../../context/userContext/UserContext";
import { checkAuthStatus } from "../helper/authHelper";
import LoadingState from "../helper/LoadingState"; // Import the LoadingState component

export const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext); // Get user context
  const [authState, setAuthState] = useState({
    loading: true,
    authorized: false,
  });

  useEffect(() => {
    const checkAuthorization = () => {
      if (user.isAuthenticated && allowedRoles.includes(user.role)) {
        setAuthState({ loading: false, authorized: true });
      } else {
        setAuthState({ loading: false, authorized: false });
      }
    };

    // Call the authorization logic
    checkAuthorization();
  }, [user, allowedRoles]);

  if (authState.loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader /> {/* Display loader while checking authorization */}
      </div>
    );
  }

  if (!authState.authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
