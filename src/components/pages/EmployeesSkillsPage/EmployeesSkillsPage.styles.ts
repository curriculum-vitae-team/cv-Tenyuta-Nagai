import { Paper as MuiPaper, styled } from '@mui/material';

export const PaperWrapper = styled(MuiPaper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,
  minWidth: '100%',
  minHeight: 300,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    rowGap: 20,
  },
}));

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 15,
}));

export const InfoWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
}));
