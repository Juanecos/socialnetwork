import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/auth.service';

export const ProtectedRoute = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export const PublicRoute = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};
