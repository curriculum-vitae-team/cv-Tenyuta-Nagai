import { styled, Paper } from '@mui/material';

export const PaperWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    rowGap: 20,
  },
}));

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexGrow: 1,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    rowGap: 20,
  },
}));

export const ContentWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 15,
}));

export const BtnWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: 40,

  [theme.breakpoints.up('sm')]: {
    paddingLeft: 20,
  },
}));
