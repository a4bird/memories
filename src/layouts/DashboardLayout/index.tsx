import React, { useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import AccountView from 'src/views/account/AccountView';
import AlbumsListView from 'src/views/albums';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';
import {
  namedOperations,
  useLogoutMutation
} from 'src/graphql/generated/types';
import { useAuthDispatch, AuthEvent } from 'src/context/Auth';
import { Album } from 'src/views/albums/Album/Album';
import { useSnackbar } from 'notistack';
import NavBar from './NavBar';
import TopBar from './TopBar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useAuthDispatch();
  const [logout] = useLogoutMutation({
    refetchQueries: [namedOperations.Query.Me]
  });

  const handleLogout = async () => {
    try {
      await logout().then(() => {
        // redirect to login page
        dispatch({
          type: AuthEvent.LOGOUT,
          payload: {
            isAuthenticated: false
          }
        });
        history.push('/login', { replace: true });
      });
    } catch (e) {
      enqueueSnackbar('Error occured while logging out user', {
        variant: 'error'
      });
    }
  };

  return (
    <div className={classes.root}>
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        onLogout={handleLogout}
      />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <Route path={`${path}/account`}>
                <AccountView />
              </Route>
              <Route path={`${path}/albums/:albumId`}>
                <Album />
              </Route>
              <Route path={`${path}/albums`}>
                <AlbumsListView />
              </Route>
              <Route path={`${path}/customers`} exact>
                <CustomerListView />
              </Route>
              <Route path={`${path}/dashboard`} exact>
                <DashboardView />
              </Route>
              <Route path={`${path}/products`}>
                <ProductListView />
              </Route>
              <Route path={`${path}/settings`}>
                <SettingsView />
              </Route>
              <Route path="*">
                <Redirect to="/404" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
