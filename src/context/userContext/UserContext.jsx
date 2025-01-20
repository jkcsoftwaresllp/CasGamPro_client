import { createContext, useState, useEffect } from "react";
import { apiCall } from "../../component/common/apiCall";
import { Loader } from "../../component/common/Loader";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateContext = (updates) => {
    if (user) {
      setUser((prevState) => ({
        ...prevState,
        ...updates,
      }));
    } else {
      console.warn(
        "UserContext is not initialized. Ensure the user logs in before updating the context."
      );
    }
  };

  const initializeContext = (initialData) => {
    setUser(initialData);
  };

  // Example useEffect to simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiCall("/getUserContext"); // Simulate an API call
        setUser(data);
      } catch (error) {
        console.error("Error fetching user context:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateContext,
        initializeContext,
      }}
    >
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
