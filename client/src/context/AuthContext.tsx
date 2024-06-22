import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the context type with the correct function signature for setAccessToken
interface AuthContextType {
  access_token: string | null;
  username: string | null;
  userid: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const access_token = localStorage.getItem("jwt_token");
  const username = localStorage.getItem("username");
  const userid = localStorage.getItem("userid");
  return (
    <AuthContext.Provider value={{ access_token, username, userid }}>
      {children}
    </AuthContext.Provider>
  );
};
