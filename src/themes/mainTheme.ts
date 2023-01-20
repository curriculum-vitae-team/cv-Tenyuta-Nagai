import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#2e2e2e',
      contrastText: '#f5f5f7',
    },
    secondary: {
      main: '#c63031',
      contrastText: '#706e6e',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
        },
        body: {
          minWidth: 320,
          margin: 0,
        },
        '#root': {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100vh',
          margin: '0 auto',
        },
        header: {
          flexGrow: 0,
        },
        footer: {
          flexGrow: 0,
        },
        main: {
          flexGrow: 1,
          position: 'relative',
          overflow: 'hidden',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 18,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 18,
          overflowX: 'hidden',
        },
      },
    },
  },
});
