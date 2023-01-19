import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

export const WrapperBreadcrumbs = styled('div')(() => ({
  marginTop: '68px',
  marginLeft: '10px',
}));

export const Link = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  ':hover': {
    cursor: 'pointer',
  },
})) as typeof Typography;

export const UserName = styled(Typography)(() => ({
  maxWidth: 100,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
