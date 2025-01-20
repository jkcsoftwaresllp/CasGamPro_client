import { createContext, useState, useEffect } from "react";
import { apiCall } from "../../component/common/apiCall";
import { Loader } from "../../component/common/Loader";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    userName: null,
    role: null,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulate an API call
        const response = {
          data: {
            status: "success",
            user: {
              userId: "12369",
              userName: "John Doe",
              role: "admin",
            },
          },
        };

        if (response.data.status === "success") {
          const { userId, userName, role } = response.data.user;

          setUser({
            userId,
            userName,
            role,
            isAuthenticated: true,
          });
        } else {
          setUser({
            userId: null,
            userName: null,
            role: null,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
        setUser({
          userId: null,
          userName: null,
          role: null,
          isAuthenticated: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
