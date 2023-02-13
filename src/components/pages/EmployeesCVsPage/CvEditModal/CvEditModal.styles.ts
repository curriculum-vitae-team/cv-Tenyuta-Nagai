import { styled } from '@mui/material';

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
