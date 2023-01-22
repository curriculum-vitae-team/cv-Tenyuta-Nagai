import { LoadingButton } from '@mui/lab';
import { styled, Avatar } from '@mui/material';

export const WrapperUserAvatar = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
}));

export const UserAvatar = styled(Avatar)(() => ({
  width: 80,
  height: 80,
})) as typeof Avatar;

export const WrapperDropArea = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  border: '1px dashed #000',
  borderRadius: '8px',
  textAlign: 'center',
}));

export const Paragraph = styled('p')(() => ({
  fontSize: 16,
}));

export const ErrorPicture = styled('p')(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.secondary.main,
}));

export const ButtonSubmit = styled(LoadingButton)(({ theme }) => ({
  marginTop: 16,
  backgroundColor: theme.palette.secondary.main,
}));
