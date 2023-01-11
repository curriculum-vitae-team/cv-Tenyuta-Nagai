import React from 'react';
import { ThemeProvider } from '@mui/material';
import { mainTheme } from './themes/mainTheme';
import { AppRouter } from './route';

export const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppRouter />
    </ThemeProvider>
  );
};
