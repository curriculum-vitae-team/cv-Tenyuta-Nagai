import { Button, styled } from '@mui/material';
import { IPrivateButtonProps } from './PrivateButton.types';

export const ContainedButton = styled(Button)<Partial<IPrivateButtonProps>>(({ theme }) => ({
  height: '40px',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.secondary.main,
})) as typeof Button;
