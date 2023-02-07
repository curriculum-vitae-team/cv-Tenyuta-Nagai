import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { SxProps } from '@mui/system';

export interface IInputTextProps<T extends FieldValues> {
  name: string;
  registerName: Path<T>;
  register: UseFormRegister<T>;
  error?: boolean;
  helperText?: string;
  sx?: SxProps;
  size?: 'small' | 'medium' | undefined;
  defaultValue?: string;
  multiline?: boolean;
  maxRows?: number;
  type?: string;
}
