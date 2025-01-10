import { createContext, useState, useEffect } from "react";
import { apiCall } from "../../component/common/apiCall";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ role: null, isAuthenticated: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiCall("/api/auth/status", "GET");
        if (response.status === "success") {
          setUser({
            role: response.user.role,
            isAuthenticated: true,
          });
        } else {
          setUser({ role: null, isAuthenticated: false });
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
        setUser({ role: null, isAuthenticated: false });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};
