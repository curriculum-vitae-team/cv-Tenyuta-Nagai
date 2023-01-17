import { Button, styled } from '@mui/material';

export const ErrorPageButton = styled(Button)({
  width: '200px',
  backgroundColor: 'black',
  ':hover': {
    backgroundColor: 'gray',
  },
}) as typeof Button;

export const ReloadButton = styled(Button)({
  backgroundColor: 'black',
  ':hover': {
    backgroundColor: 'gray',
  },
}) as typeof Button;
