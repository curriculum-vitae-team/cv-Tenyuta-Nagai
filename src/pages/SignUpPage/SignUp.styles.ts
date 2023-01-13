import { Button, Grid, Paper, styled, Typography } from '@mui/material';

export const Main = styled('main')({
  marginTop: '65px',
});

export const GridContainer = styled(Grid)({
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  margin: 'auto',
  left: '0',
  right: '0',
});

export const PaperContainer = styled(Paper)({
  padding: '10px',
  height: 450,
  width: 550,
  margin: '40px auto',
});

export const ButtonSubmitForm = styled(Button)(({ theme }) => ({
  height: 50,
  marginTop: '16px',
  color: 'white',
  textDecoration: 'none',
  backgroundColor: theme.palette.secondary.main,
}));

export const ValidationError = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '11px',
}));

export const FormSign = styled('form')({
  width: '100%',
});
