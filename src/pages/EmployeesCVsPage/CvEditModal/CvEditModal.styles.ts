import { styled } from '@mui/material';
import { LoadingButton as MuiLoadingButton } from '@mui/lab';

export const Button = styled(MuiLoadingButton)(({ theme }) => ({
  marginTop: 16,
  backgroundColor: theme.palette.secondary.main,

  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
}));

export const CheckboxWrap = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const ButtonsWrap = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 10,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const checkboxLabel = { inputProps: { 'aria-label': 'Template' } };
