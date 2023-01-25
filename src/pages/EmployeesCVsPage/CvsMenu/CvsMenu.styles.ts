import { Card, MenuList, styled, Toolbar } from '@mui/material';

export const CardMenu = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  minHeight: '100vh',
  borderRadius: 0,
  boxShadow: 'none',
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },

  [theme.breakpoints.down('sm')]: {
    maxWidth: '250px',
  },
}));

export const ToolbarMenu = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
}));

export const ListMenu = styled(MenuList)(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 18,
}));
