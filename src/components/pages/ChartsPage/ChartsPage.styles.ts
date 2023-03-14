import { styled, Typography, Box, Paper } from '@mui/material';

export const PaperWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  padding: 10,
  justifyContent: 'center',
  margin: 'auto',
  flexDirection: 'column',
  marginBottom: '40px',
  width: '750px',
  [theme.breakpoints.down('md')]: {
    width: '550px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '340px',
  },
}));

export const ChartWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '450px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
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

export const BarChartWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  height: '500px',
  width: '100%',
  margin: 'auto',
}));
