import { styled, Paper, Typography, Avatar } from '@mui/material';

export const PaperWrapper = styled(Paper)(() => ({
  padding: 20,
})) as typeof Paper;

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 15,
}));

export const UserAvatar = styled(Avatar)(() => ({
  width: 60,
  height: 60,
})) as typeof Avatar;

export const InfoWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
}));

export const RowWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: 10,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const RowTitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  color: theme.palette.primary.main,

  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
})) as typeof Typography;

export const RowContentTypography = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  color: theme.palette.secondary.contrastText,

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 18,
  },
})) as typeof Typography;
