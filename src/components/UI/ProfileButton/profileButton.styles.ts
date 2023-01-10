import { styled, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export const WrapProfileButtons = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
}));

export const TypographyEmailProfileButtons = styled(Typography)(({ theme }) => ({
  minWidth: 100,
  maxWidth: 180,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('sm')]: {
    maxWidth: 100,
  },
}));

export const AvatarProfileButtons = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  ml: 1,
  backgroundColor: theme.palette.secondary.main,
}));

export const PaperPropsProfileButtons = {
  minWidth: 200,
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    backgroundColor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
};

export const IconStyleProfileButtons = {
  color: 'secondary.contrastText',
  mr: 2,
};
