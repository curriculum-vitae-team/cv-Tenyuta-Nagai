import { styled, Paper, Typography, Avatar } from '@mui/material';

export const PaperWrapper = styled(Paper)(() => ({
  padding: 10,
})) as typeof Paper;

export const AvatarWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: 10,
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,

  [theme.breakpoints.down('sm')]: {
    width: 40,
    height: 40,
  },
})) as typeof Avatar;

export const NameTypography = styled(Typography)(({ theme }) => ({
  fontSize: 22,

  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}));

export const InfoWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
}));

export const RowWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: 10,
}));
