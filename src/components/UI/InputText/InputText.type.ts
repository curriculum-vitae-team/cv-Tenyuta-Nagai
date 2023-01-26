import { UseFormRegister, FieldValues } from 'react-hook-form';
import { SxProps } from '@mui/system';

export interface IInputTextProps {
  name: string;
  registerName: string;
  register: UseFormRegister<FieldValues>;
  error?: boolean;
  helperText?: string;
  sx?: SxProps;
  size?: 'small' | 'medium' | undefined;
  defaultValue?: string;
}
