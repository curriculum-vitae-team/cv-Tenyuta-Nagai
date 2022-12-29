import React from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { mainTheme } from './themes/mainTheme';
import { AppRouter } from './route';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};
