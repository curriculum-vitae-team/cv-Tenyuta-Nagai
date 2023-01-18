import { Button, styled } from '@mui/material';

export const ButtonAddEmployee = styled(Button)(({ theme }) => ({
  height: '40px',
  color: 'white',
  textDecoration: 'none',
  maxWidth: '200px',
  padding: '0px 30px',
  size: 'small',
  marginTop: '5px',
  backgroundColor: theme.palette.secondary.main,
  ':hover': {
    backgroundColor: 'gray',
  },
})) as typeof Button;
