import { Button, styled } from '@mui/material';

export const ButtonAddEmployee = styled(Button)(({ theme }) => ({
  height: '40px',
  color: 'white',
  textDecoration: 'none',
  minWidth: '200px',
  size: 'small',
  marginTop: '5px',
  backgroundColor: theme.palette.secondary.main,
  ':hover': {
    backgroundColor: 'gray',
  },
}));
