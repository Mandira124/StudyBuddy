// ProtectedRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Replace with your actual authentication context
import { Outlet } from 'react-router-dom';
interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoutes = () => {
  const { access_token } = useAuth(); 
  const tokennn=localStorage.getItem('jwt-token');
  
  if (!tokennn) {
    
    return <Navigate to="/login" />;
  }

 
  return <Outlet/>;
};

export default ProtectedRoutes;
