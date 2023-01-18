import { styled, Tab } from '@mui/material';

export const Wrapper = styled('div')(() => ({
  width: '100%',
  marginTop: 5,
  marginBottom: 10,
  backgroundColor: 'hidden',
  color: 'green',
}));

export const TabNav = styled(Tab)(({ theme }) => ({
  minWidth: 150,
  color: theme.palette.primary.main,
  fontWeight: 500,

  [theme.breakpoints.only('sm')]: {
    minWidth: 120,
  },
  [theme.breakpoints.only('xs')]: {
    minWidth: 50,
    fontSize: 12,
    fontWeight: 400,
  },
})) as typeof Tab;
