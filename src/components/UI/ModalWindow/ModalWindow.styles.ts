import { IconButton, styled } from '@mui/material';

export const IconButtonModalWindow = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.secondary.contrastText,
}));
