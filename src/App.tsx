import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';

import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import AppRoutes from 'src/routes';
import { useMeQuery } from './graphql/generated/types';
import { useAuthState, useAuthDispatch, AuthEvent } from './context/Auth';

const App: React.FC = () => {
  const dispatch = useAuthDispatch();
  const authState = useAuthState();
  const { loading, error, data } = useMeQuery();

  useEffect(() => {
    if (loading || error) return;

    if (!authState.isAuthenticated && data?.me?.userAccount) {
      dispatch({
        type: AuthEvent.ALREADY_LOGGEDIN,
        payload: {
          userAccount: {
            id: data.me.userAccount.id,
            email: data.me.userAccount.email
          }
        }
      });
    }
  }, [loading, error, data, authState.isAuthenticated, dispatch]);

  // TODO: Loading and Error Components
  if (loading) return <div>{'Loading...'}</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRoutes></AppRoutes>
    </ThemeProvider>
  );
};

export default App;
