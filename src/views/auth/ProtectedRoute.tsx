import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuthState } from 'src/context/Auth';

const ProtectedRoute = ({ ...rest }) => {
  const authState = useAuthState();

  if (!authState.isAuthenticated) return <Navigate to="/login" />;

  return <Route {...rest}></Route>;
};

export default ProtectedRoute;
