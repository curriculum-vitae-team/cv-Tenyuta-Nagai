import { LoadingButton } from '@mui/lab';
import { FormControl as MuiFormControl, styled } from '@mui/material';

export const FormWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 16,
  minWidth: 400,
  paddingTop: 20,

  [theme.breakpoints.down('sm')]: {
    minWidth: 200,
  },
}));

export const FormControl = styled(MuiFormControl)(() => ({
  margin: 1,
  minWidth: 120,
}));

export const ButtonSubmit = styled(LoadingButton)(({ theme }) => ({
  marginTop: 16,
  backgroundColor: theme.palette.secondary.main,

  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
}));

export const ChipWrapper = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
}));
