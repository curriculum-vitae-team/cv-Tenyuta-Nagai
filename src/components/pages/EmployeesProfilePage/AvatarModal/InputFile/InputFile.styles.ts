import { styled, Box } from '@mui/material';

export const FakeLabel = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 20,

  ':hover': { cursor: 'pointer' },
})) as typeof Box;
