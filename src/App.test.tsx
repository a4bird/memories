import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from 'notistack';
import { render } from '@testing-library/react';

import App from './App';
import client from './client';
import { AuthProvider } from './context/Auth';

test('renders learn react link', () => {
  const { getByText } = render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
  const linkElement = getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
