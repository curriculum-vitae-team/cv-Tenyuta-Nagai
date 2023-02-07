import { styled, Paper, Typography, Container } from '@mui/material';

export const PaperWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    rowGap: 20,
  },
}));

export const ContainerWrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 12,
})) as typeof Container;

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 15,
}));

export const InfoWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
}));

export const RowWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: 10,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
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
