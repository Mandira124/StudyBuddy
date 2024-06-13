import { Navigate,Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/contextapi";
import LoginPage from "./pages/auth/LoginPage";



export const ProtectedRoutes=()=>{

    const navigate=useNavigate();
    const goToLogin=()=>{
        navigate("/login");
    }
    const {token}=useAuth();

    if(!token){
        goToLogin();
    }

    return <Outlet/>;
};