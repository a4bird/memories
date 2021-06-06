import React, { useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';

import AccountView from 'src/views/account/AccountView';
import AlbumsListView from 'src/views/AlbumsListView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';
import { useLogoutMutation } from 'src/graphql/generated/types';
import { useAuthDispatch, AuthEvent } from 'src/context/Auth';

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
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useAuthDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login', { replace: true });
      // redirect to login page
      dispatch({
        type: AuthEvent.LOGOUT,
        payload: {
          isAuthenticated: false
        }
      });
    } catch (e) {
      // TODO: Handle exception
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
