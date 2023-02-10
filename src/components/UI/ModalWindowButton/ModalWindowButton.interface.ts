import { SxProps } from '@mui/material';

export interface IModalWindowButtonProps {
  loading: boolean;
  isValid: boolean;
  name?: string;
  sx?: SxProps;
  size?: 'large' | 'small' | 'medium' | undefined;
}
