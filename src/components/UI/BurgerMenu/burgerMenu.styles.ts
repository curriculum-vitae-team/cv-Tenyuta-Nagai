import { Card, styled, Toolbar } from '@mui/material';

export const CardBurgerMenu = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 250,
  minHeight: '100vh',
  borderRadius: 0,
  boxShadow: 'none',
}));

export const ToolbarBurgerMenu = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
}));
