import { Button, styled, Typography } from '@mui/material';

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

export const TypographyStyled = styled(Typography)({
  textAlign: 'center',
  fontSize: '32px',
  fontWeight: 'bold',
  marginBottom: '26px',
});

export const Image = styled('img')({
  display: 'block',
  width: '100%',
});
