import { ReactNode } from 'react';
import { SxProps } from '@mui/system';

export interface IPrivateButtonProps {
  children: ReactNode;
  isVisible: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large' | undefined;
  sx?: SxProps;
  disabled?: boolean;
}
