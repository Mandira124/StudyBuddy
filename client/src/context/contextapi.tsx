// src/context/UserContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";

// Create a Context with default values
export const UserContext = createContext();

// Create a Provider Component
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    // Fetch username from local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
