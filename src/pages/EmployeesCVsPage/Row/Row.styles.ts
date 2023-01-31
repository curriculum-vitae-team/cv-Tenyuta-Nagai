import { styled, Typography } from '@mui/material';

export const TopicWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
}));

export const RowTitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  color: theme.palette.secondary.contrastText,

  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  },
}));

export const RowContentTypography = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  color: theme.palette.primary.main,

  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 18,
  },
}));
