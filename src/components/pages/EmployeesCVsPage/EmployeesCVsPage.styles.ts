import { Button, Divider, Paper as MuiPaper, styled } from '@mui/material';

export const Paper = styled(MuiPaper)(() => ({
  minWidth: '100%',
  minHeight: 300,
}));

export const WrapperCvsButton = styled('div')(({ theme }) => ({
  display: 'none',
  justifyContent: 'center',
  paddingTop: 18,
  paddingBottom: 18,

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

export const CvsButton = styled(Button)(() => ({
  fontSize: 18,
  fontWeight: 500,
}));

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexGrow: 1,
  maxHeight: '70vh',
  marginTop: 5,
  padding: 16,
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    rowGap: 16,
  },
}));

export const ContentWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 18,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
}));

export const ButtonWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 0,
  display: 'flex',
  columnGap: 18,

  [theme.breakpoints.down('sm')]: {
    position: 'static',
    justifyContent: 'center',
  },
}));

export const CvsListWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  maxWidth: 300,
  maxHeight: '70vh',
  overflowY: 'auto',
  '::-webkit-scrollbar': {
    width: 8,
    height: 8,
  },

  [theme.breakpoints.down('md')]: {
    maxWidth: 200,
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const DriverLine = styled(Divider)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

export const PositionWrapper = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
}));
