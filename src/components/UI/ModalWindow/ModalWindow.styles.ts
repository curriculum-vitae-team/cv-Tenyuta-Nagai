import { Dialog, IconButton, styled } from '@mui/material';

export const WrapperTheme = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
}));

export const IconButtonModalWindow = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.secondary.contrastText,
}));
