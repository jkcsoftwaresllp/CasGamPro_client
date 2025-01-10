import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext";
import { checkAuthStatus } from "../helper/authHelper";
import LoadingState from "../helper/LoadingState"; // Import the LoadingState component

export const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user, setUser } = useContext(UserContext);
  const [authState, setAuthState] = useState({
    loading: true,
    authorized: false,
  });

  useEffect(() => {
    const cachedRole = user.role || localStorage.getItem("userRole");

    if (cachedRole) {
      setAuthState({
        loading: false,
        authorized: allowedRoles.includes(cachedRole),
      });
    } else {
      const fetchAuthStatus = async () => {
        const status = await checkAuthStatus(allowedRoles, setUser);
        setAuthState(status);
      };
      fetchAuthStatus();
    }
  }, [allowedRoles, user, setUser]);

  if (authState.loading) {
    return <LoadingState />;
  }

  if (!authState.authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
