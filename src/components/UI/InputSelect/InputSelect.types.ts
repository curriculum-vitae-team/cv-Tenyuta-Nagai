import { UseFormRegister, FieldValues } from 'react-hook-form';
import { SxProps } from '@mui/system';

type TData = { id: string; name: string };

export interface IInputSelectProps {
  label: string;
  registerName: string;
  register: UseFormRegister<FieldValues>;
  defaultValue: string;
  data: TData[];
  sx?: SxProps;
  size?: 'small' | 'medium' | undefined;
}
