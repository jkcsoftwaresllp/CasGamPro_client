import { createContext, useState } from "react";

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
    <UserContext.Provider
      value={{ userContext, updateContext, initializeContext }}
    >
      {children}
    </UserContext.Provider>
  );
};
