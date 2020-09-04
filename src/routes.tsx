import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

export default () => (
  <Routes>
    <Route path="app" element={<DashboardLayout />}>
      <Route path="account" element={<AccountView />}></Route>
      <Route path="customers" element={<CustomerListView />}></Route>
      <Route path="dashboard" element={<DashboardView />}></Route>
      <Route path="products" element={<ProductListView />}></Route>
      <Route path="settings" element={<SettingsView />}></Route>
      <Route path="*" element={<Navigate to="/404" />}></Route>
    </Route>
    <Route path="/" element={<MainLayout />}>
      <Route path="login" element={<LoginView />}></Route>
      <Route path="register" element={<RegisterView />}></Route>
      <Route path="404" element={<NotFoundView />}></Route>
      <Route path="/" element={<Navigate to="/login" />}></Route>
      <Route path="*" element={<Navigate to="/404" />}></Route>
    </Route>
  </Routes>
);
