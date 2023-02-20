import { styled } from '@mui/material';

export const DownloadLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
}));
