import { createContext, useState, useEffect } from "react";
import { apiCall } from "../../component/common/apiCall";
import { Loader } from "../../component/common/Loader";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(null); // Initially null, set only on login

  const updateContext = (updates) => {
    if (userContext) {
      setUserContext((prevState) => ({
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
    setUserContext(initialData);
  };

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
