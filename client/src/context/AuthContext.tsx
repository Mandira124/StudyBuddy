import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
2
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
