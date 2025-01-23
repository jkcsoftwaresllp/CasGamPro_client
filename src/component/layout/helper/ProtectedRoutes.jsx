import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../../common/Loader";
import { useAuth } from "../../../context/jsx/AuthContext";

export const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user } = useAuth();

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
    return <Loader />;
  }

  if (!authState.authorized) {
    // return <Navigate to="/login" replace />;
    console.log("Unauthorized");
  }

  return children;
};
