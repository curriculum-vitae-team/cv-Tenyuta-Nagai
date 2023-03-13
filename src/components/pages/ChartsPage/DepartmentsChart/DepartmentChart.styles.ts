import { styled, Typography, Box, Paper } from '@mui/material';

export const PaperWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  padding: 10,
  justifyContent: 'center',
  flexDirection: 'column',
  marginBottom: '40px',
  width: '500px',
  [theme.breakpoints.down('sm')]: {
    width: '380px',
  },
}));

export const ChartWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}));

export const PaperTypography = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  marginBottom: '20px',
  color: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 16,
  },
}));
