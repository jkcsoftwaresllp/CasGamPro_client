import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../../component/common/Loader";
import { useAuth } from "../../context/jsx/AuthContext";

export const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  const [authState, setAuthState] = useState({
    loading: true,
    authorized: false,
  });

  useEffect(() => {
    const checkAuthorization = () => {
      if (user && allowedRoles.includes(user.userRole)) {
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
