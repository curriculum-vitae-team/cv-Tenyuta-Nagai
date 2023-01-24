import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { mainTheme } from './themes/mainTheme';
import { AppRouter } from './route';
import { client } from './graphql/client';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </ApolloProvider>
  );
};
