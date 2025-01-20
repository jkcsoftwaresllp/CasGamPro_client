import React, { createContext, useState, useEffect } from "react";
import { apiCall } from "../../component/common/apiCall";
import { login } from "../helper/login";
import { logout } from "../helper/logout";
import { checkSession } from "../helper/checkSession";

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = async (credentials) => await login(setUser, credentials);
  const handleLogout = async () => logout();

  // Check session on mount
  useEffect(() => {
    checkSession(setUser, setLoading);
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
