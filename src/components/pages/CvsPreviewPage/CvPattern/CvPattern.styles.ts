import { Box, styled, Paper, Typography } from '@mui/material';

export const PaperCV = styled(Paper)(({ theme }) => ({
  padding: '25px 50px',
  backgroundColor: theme.palette.primary.contrastText,
  minHeight: '1127px',
  minWidth: '707px',
  width: '707px',
  border: '0.5px solid black',
}));

export const EmployeeBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: '80px',
}));

export const FullName = styled(Typography)(() => ({
  fontWeight: 'bold',
  marginTop: '20px',
  fontSize: '30px',
}));

export const Subtitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '18px',
  marginTop: '20px',
}));

export const ProjectBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginTop: '30px',
}));

export const SmallSubtitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '16px',
}));
