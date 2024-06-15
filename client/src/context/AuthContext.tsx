import React, { createContext, useState, useContext, ReactNode } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
2
export const useAuth = () => {
  return useContext(AuthContext);
}




export function AuthProvider(props){
    const [authUser,setAuthUser]=useState(null);
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    const value={
      authUser,
      setAuthUser,
      isLoggedIn,
      setIsLoggedIn
    }
    return (
      <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )

}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const access_token=localStorage.getItem('jwt_token');
  const username=localStorage.getItem("username");
  return (
    <AuthContext.Provider value={{ access_token ,username}}>
      {children}
    </AuthContext.Provider>
  );
};
