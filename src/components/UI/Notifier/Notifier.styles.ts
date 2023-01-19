import { styled } from '@mui/material';

export const Wrapper = styled('div')(() => ({
  position: 'fixed',
  bottom: '20px',
  left: '20px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
  maxWidth: 500,
}));
