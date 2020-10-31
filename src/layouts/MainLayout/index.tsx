import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';

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
    paddingTop: 64
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

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <Route path="/login" exact>
                <LoginView />
              </Route>
              <Route path="/register" exact>
                <RegisterView />
              </Route>
              <Route path="/404" exact>
                <NotFoundView />
              </Route>
              <Route path="/">
                <Redirect to="/login" />
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

export default MainLayout;
