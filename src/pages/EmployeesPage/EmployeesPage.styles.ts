import { styled, Grid } from '@mui/material';

export const Main = styled('main')({
  margin: '0px 40px',
});

export const TableGrid = styled(Grid)({
  maxWidth: '1400px',
  margin: 'auto',
}) as typeof Grid;
