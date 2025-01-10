import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext";
import { checkAuthStatus } from "../helper/authHelper";
import LoadingState from "../helper/LoadingState"; // Import the LoadingState component

export const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { userContext, initializeContext, updateContext } =
    useContext(UserContext);

  const [authState, setAuthState] = useState({
    loading: true,
    authorized: false,
  });

  useEffect(() => {
    // Check if userContext has been initialized and contains valid data
    if (userContext && userContext.role) {
      // If userContext is available, use its role to check authorization
      setAuthState({
        loading: false,
        authorized: allowedRoles.includes(userContext.role),
      });
    } else {
      // If userContext is not initialized, call the API to fetch authentication status
      const fetchAuthStatus = async () => {
        const status = await checkAuthStatus(
          allowedRoles,
          updateContext,
          initializeContext
        );
        setAuthState(status);
      };
      fetchAuthStatus();
    }
  }, [allowedRoles, userContext, updateContext, initializeContext]);

  if (authState.loading) {
    return <LoadingState />;
  }

  if (!authState.authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
