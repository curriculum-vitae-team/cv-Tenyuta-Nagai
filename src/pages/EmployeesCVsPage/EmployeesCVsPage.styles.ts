import { Button, styled, Typography } from '@mui/material';

export const WrapperCvsButton = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 18,
  paddingBottom: 18,
}));

export const CvsButton = styled(Button)(() => ({
  ontSize: 18,
  fontWeight: 500,
}));

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 16,

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

export const TopicWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
}));

export const RowTitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  color: theme.palette.secondary.contrastText,

  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}));

export const RowContentTypography = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  color: theme.palette.primary.main,

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 18,
  },
}));

export const ButtonWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  columnGap: 18,

  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));
