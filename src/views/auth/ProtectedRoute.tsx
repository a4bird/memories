import React, { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'src/context/Auth';

const ProtectedRoute = ({
  children,
  ...rest
}: {
  path: string;
  children: ReactNode;
}) => {
  const authState = useAuthState();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authState.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
