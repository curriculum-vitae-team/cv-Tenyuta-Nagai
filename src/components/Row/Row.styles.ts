import { styled } from '@mui/material';

export const RowWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: 10,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const RowTitle = styled('div')(({ theme }) => ({
  fontSize: 22,
  color: theme.palette.secondary.contrastText,
  whiteSpace: 'nowrap',

  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}));

export const RowContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: 22,
  color: theme.palette.primary.main,

  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
    textAlign: 'center',
  },
}));
