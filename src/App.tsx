import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { mainTheme } from './themes/mainTheme';
import { AppRouter } from './route';

export const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
};
