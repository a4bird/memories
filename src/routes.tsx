import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import ProtectedRoute from './views/auth/ProtectedRoute';

// eslint-disable-next-line react/display-name
export default () => (
  <Switch>
    <ProtectedRoute path="/app">
      <DashboardLayout />
    </ProtectedRoute>
    <Route path="/">
      <MainLayout />
    </Route>
  </Switch>
);
