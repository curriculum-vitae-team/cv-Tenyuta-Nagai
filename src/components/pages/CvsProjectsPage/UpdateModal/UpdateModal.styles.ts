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

export const ChipWrapper = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
}));
