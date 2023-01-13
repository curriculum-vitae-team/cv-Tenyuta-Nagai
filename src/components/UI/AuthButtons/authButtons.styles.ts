import { styled, Tab } from '@mui/material';

export const WrapAuthButtons = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  color: 'green',
}));

export const TabAuthButtons = styled(Tab)(({ theme }) => ({
  minWidth: 150,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,

  [theme.breakpoints.only('sm')]: {
    minWidth: 120,
    fontWeight: 500,
  },
  [theme.breakpoints.only('xs')]: {
    minWidth: 50,
    fontSize: 12,
    fontWeight: 400,
  },
})) as typeof Tab;
