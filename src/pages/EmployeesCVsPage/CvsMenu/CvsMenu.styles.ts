import { Card, styled, Toolbar } from '@mui/material';

export const CardMenu = styled(Card)(({ theme }) => ({
  width: '500px',
  minHeight: '100vh',
  borderRadius: 0,
  boxShadow: 'none',
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },

  [theme.breakpoints.down('sm')]: {
    width: '250px',
  },
}));

export const ToolbarMenu = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
}));
