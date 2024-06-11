import React ,{ useState, useContext } from "react";

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

export default AuthContext;
