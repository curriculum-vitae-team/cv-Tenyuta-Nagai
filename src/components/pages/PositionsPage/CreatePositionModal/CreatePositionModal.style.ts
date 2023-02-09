import { styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const ButtonSubmit = styled(LoadingButton)(({ theme }) => ({
  marginTop: 16,
  backgroundColor: theme.palette.secondary.main,

  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
}));
