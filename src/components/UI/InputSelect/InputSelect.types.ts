import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { SxProps } from '@mui/system';

type TData = { id: string; name: string };

export interface IInputSelectProps<T extends FieldValues> {
  label: string;
  registerName?: Path<T>;
  register?: UseFormRegister<T>;
  defaultValue?: string;
  data: TData[];
  sx?: SxProps;
  size?: 'small' | 'medium' | undefined;
}
